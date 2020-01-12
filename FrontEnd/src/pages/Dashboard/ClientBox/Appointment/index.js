import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { subDays, subHours, addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import api from '~/services/api';

import Loading from '~/components/Loading';
import Modal from '~/components/Modal';

import {
  Container,
  EmployeeCard,
  ModalContent,
  Btn,
  ModalBody,
  AvailableTime,
} from './styles';

export default function Appointment() {
  const dateWithSub = subHours(new Date(), 1);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dateWithSub);
  const [doctors, setDoctors] = useState([]);
  const [docId, setDocId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [availables, setAvailables] = useState([]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadDoctors() {
      try {
        setLoading(true);
        const response = await api.get('doctors');
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
    loadDoctors();
  }, []);

  async function handleLoadAvailable() {
    try {
      if (!docId) return;
      const response = await api.get(`doctors/${docId}/available`, {
        params: { date: date.getTime() },
      });
      setAvailables(response.data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleShowModal(id) {
    setModalShow(!modalShow);
    setDocId(id);
  }
  function handleHideModal() {
    setModalShow(false);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  function handlePrevDay() {
    if (date <= new Date()) return;
    setDate(subDays(date, 1));
  }

  useEffect(() => {
    handleLoadAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, docId]);

  async function handleAppointment(value) {
    try {
      if (
        window.confirm('Tem certeza que deseja agendar para esse horario ?')
      ) {
        await api.post('appointments', {
          doctor_id: docId,
          date: value,
        });
        toast.success('Horario agendado com sucesso !!');
        const refreshList = availables.map(refresh => {
          const findOne = availables.find(ava => ava.value === value);
          findOne.available = false;
          return refresh;
        });
        setAvailables(refreshList);
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <h1>Selecione o Dentista</h1>
      {loading ? (
        <Loading size={30} />
      ) : (
        <section>
          {doctors.map(doctor => (
            <EmployeeCard key={doctor.id}>
              <header>
                <div>
                  <strong>{doctor.name}</strong>
                  <p>#{doctor.profession}</p>
                </div>
                <img
                  src={
                    doctor.avatar
                      ? doctor.avatar.url
                      : `https://api.adorable.io/avatars/50/${doctor.name}.png`
                  }
                  alt="doctor"
                />
              </header>
              <footer>
                <button
                  type="button"
                  onClick={() => handleShowModal(doctor.id)}
                >
                  Selecionar
                </button>
              </footer>
            </EmployeeCard>
          ))}
        </section>
      )}
      <Modal
        display={modalShow ? 1 : 0}
        doctor={docId}
        handleHideModal={handleHideModal}
        modalTitle="Selecione um horario"
        bg="rgba(8, 38, 74, 0.9)"
        borderRadius={4}
      >
        <ModalContent>
          <header>
            <Btn
              type="button"
              onClick={handlePrevDay}
              disabled={date <= new Date()}
            >
              <FaChevronCircleLeft size={25} color="#36CB4F" />
            </Btn>
            <strong> {dateFormatted} </strong>
            <Btn type="button" onClick={handleNextDay}>
              <FaChevronCircleRight size={25} color="#36CB4F" />
            </Btn>
          </header>
          <ModalBody>
            <ul>
              {availables.map(available => (
                <AvailableTime
                  key={available.time}
                  enabled={available.available}
                >
                  <div>
                    <strong>
                      {available.available ? 'VAGO' : 'Indisponivel'}
                    </strong>
                    <p>{available.time}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAppointment(available.value)}
                  >
                    Agendar
                  </button>
                </AvailableTime>
              ))}
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
