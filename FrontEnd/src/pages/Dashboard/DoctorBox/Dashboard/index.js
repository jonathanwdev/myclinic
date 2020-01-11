/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import api from '~/services/api';

import { Container, Item, Btn } from './styles';
import Loading from '~/components/Loading';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadSchedule() {
    setLoading(true);
    const response = await api.get('schedule', {
      params: {
        date,
      },
    });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const data = range.map(hour => {
      const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
      const compareDate = utcToZonedTime(checkDate, timezone);

      return {
        time: `${hour}:00h`,
        past: isBefore(compareDate, new Date()),
        appointment: response.data.find(
          a => parseISO(a.date).toString() === compareDate.toString()
        ),
      };
    });
    setSchedule(data);
    setLoading(false);
  }

  async function handleCancel(id) {
    if (window.confirm('Tem certeza que deseja cancelar esse agendamento ?')) {
      try {
        await api.delete(`schedule/${id}`);
        loadSchedule();
        toast.success('Agendamento cancelado com sucesso!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  useEffect(() => {
    loadSchedule();
  }, [date]);

  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  function handlePrevDay() {
    if (date <= new Date()) return;
    setDate(subDays(date, 1));
  }

  return (
    <Container>
      <h1>Dashboard</h1>
      <header>
        <Btn type="button" onClick={handlePrevDay} disable={date <= new Date()}>
          <FaChevronCircleLeft size={25} color="#36CB4F" />
        </Btn>
        <strong> {dateFormatted} </strong>
        <Btn type="button" onClick={handleNextDay}>
          <FaChevronCircleRight size={25} color="#36CB4F" />
        </Btn>
      </header>
      {loading ? (
        <Loading size={30} />
      ) : (
        <ul>
          {schedule.map(sched => (
            <Item
              past={sched.past}
              key={sched.time}
              available={!sched.appointment}
              cancelable={sched.appointment && sched.appointment.cancelable}
            >
              <article>
                <p>
                  {sched.appointment ? sched.appointment.user.name : 'Vago'}
                </p>
                <footer>
                  <small>{sched.time}</small>
                  <button
                    type="button"
                    onClick={() =>
                      handleCancel(
                        sched.appointment ? sched.appointment.id : ''
                      )
                    }
                  >
                    <TiCancel size={15} />
                  </button>
                </footer>
              </article>
              {sched.appointment ? (
                <img
                  src={
                    sched.appointment && sched.appointment.user.avatar
                      ? sched.appointment.user.avatar.url
                      : `https://api.adorable.io/avatars/50/${sched.appointment.user.name}.png`
                  }
                  alt="profile"
                />
              ) : (
                ''
              )}
            </Item>
          ))}
        </ul>
      )}
    </Container>
  );
}
