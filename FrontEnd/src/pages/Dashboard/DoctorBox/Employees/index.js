import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
import Loading from '~/components/Loading';

import { Container, EmployeeCard } from './styles';

export default function Employees() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

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
  async function handleDeleteDoctor(id) {
    const docFired = doctors.find(doc => doc.id === id);
    if (
      // eslint-disable-next-line no-alert
      window.confirm(`Tem certeza que deseja demitir o(a) ${docFired.name}??`)
    ) {
      try {
        await api.delete(`doctors/${id}`);
        const removeFromList = doctors.filter(doc => doc.id !== id);
        setDoctors(removeFromList);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <h1>Funcionarios</h1>
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
                  onClick={() => handleDeleteDoctor(doctor.id)}
                >
                  Demitir {doctor.name}
                </button>
              </footer>
            </EmployeeCard>
          ))}
        </section>
      )}
    </Container>
  );
}
