import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, addDays, subDays, parseISO, addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import api from '~/services/api';

import Loading from '~/components/Loading';
import {
  Container,
  Btn,
  Item,
  Data,
  ChangePage,
  CancelationButton,
} from './styles';

export default function MyAppointments() {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handleNextPage() {
    if (appointments.length < 6) return;
    setPage(page + 1);
  }
  function handlePrevPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  useEffect(() => {
    async function loadAppointments() {
      try {
        setLoading(true);
        const response = await api.get('/appointments', {
          params: {
            page,
            date: date.getTime(),
          },
        });
        const data = response.data.map(appoin => ({
          ...appoin,
          dateWithTime: format(
            addHours(parseISO(appoin.date), 1),
            "'Dia 'dd 'de' MMMM ' às 'HH'h'",
            {
              locale: pt,
            }
          ),
        }));
        setLoading(false);
        setAppointments(data);
      } catch (err) {
        toast.error(err.response.data.errpr);
      }
    }
    loadAppointments();
  }, [date, page]);

  function handleNextDay() {
    setDate(addDays(date, 1));
    setPage(1);
  }
  function handlePrevDay() {
    setDate(subDays(date, 1));
    setPage(1);
  }
  async function handleCancelAppointment(id) {
    if (window.confirm('Tem certeza que deseja cancelar esse agendamento??')) {
      try {
        await api.delete(`/appointments/${id}`);
        const refreshList = appointments.filter(ref => ref.id !== id);
        toast.success('Agendamento cancelado com sucesso!');
        setAppointments(refreshList);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <h1>Meus agendamentos</h1>
      <header>
        <Btn type="button" onClick={handlePrevDay}>
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
          {appointments.map(appointment => (
            <Item key={appointment.id} disabled={appointment.past}>
              <Data>
                <div>
                  <strong>Prestador: {appointment.doctor.name}</strong>
                  <p>#{appointment.doctor.profession}</p>
                  <small>{appointment.dateWithTime}</small>
                </div>
                <img
                  src={
                    appointment.doctor.avatar
                      ? appointment.doctor.avatar.url
                      : `https://api.adorable.io/avatars/50/${appointment.doctor.name}.png`
                  }
                  alt="profile"
                />
              </Data>
              <CancelationButton
                disabled={!appointment.cancelable}
                type="button"
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                {!appointment.cancelable
                  ? 'Não cancelavel'
                  : 'Cancelar horario'}
              </CancelationButton>
            </Item>
          ))}
        </ul>
      )}
      <footer>
        <ChangePage
          type="button"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          PAGINA ANTERIOR
        </ChangePage>
        <ChangePage
          type="button"
          onClick={handleNextPage}
          disabled={appointments.length < 6}
        >
          PRÓXIMA PAGINA
        </ChangePage>
      </footer>
    </Container>
  );
}
