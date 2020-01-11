import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';

import Loading from '~/components/Loading';
import Modal from '~/components/Modal';

import { Container, EmployeeCard, ModalContent } from './styles';

export default function Appointment() {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [docId, setDocId] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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

  function handleShowModal(id) {
    setModalShow(!modalShow);
    setDocId(id);
  }
  function handleHideModal() {
    setModalShow(false);
  }

  return (
    <Container>
      <Modal
        display={modalShow}
        doctor={docId}
        handleHideModal={handleHideModal}
        modalTitle="Selecione um horario"
      >
        <ModalContent />
      </Modal>
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
    </Container>
  );
}
