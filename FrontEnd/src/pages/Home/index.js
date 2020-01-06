import React from 'react';
import { Link } from 'react-router-dom';

import Phone from '~/assets/phone.png';

import { Background, Container } from './styles';

export default function Home() {
  return (
    <>
      <Background />
      <Container>
        <section>
          <article>
            Clinica
            <br />
            Ortodontica
            <br />
            MyClinic
          </article>
          <Link to="/login">Agendar atendimento</Link>
        </section>
        <aside>
          <img src={Phone} alt="phone" />
        </aside>
      </Container>
    </>
  );
}
