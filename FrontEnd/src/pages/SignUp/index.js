import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '~/assets/logoForm.svg';

import { Container, ContentForm } from './styles';

export default function SignUp() {
  return (
    <Container>
      <ContentForm>
        <img src={Logo} alt="logo" />
        <form>
          <input type="text" name="name" placeholder="Digite seu nome" />
          <input type="text" name="email" placeholder="Digite seu email" />
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <input
            type="password"
            name="password"
            placeholder="Confirme sua senha"
          />
          <button type="button">Logar</button>
          <Link to="/register"> Já tenho uma conta</Link>
        </form>
      </ContentForm>
    </Container>
  );
}
