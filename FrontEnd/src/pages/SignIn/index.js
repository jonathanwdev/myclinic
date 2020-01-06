import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '~/assets/logoForm.svg';

import { Container, ContentForm } from './styles';

export default function SignIn() {
  return (
    <Container>
      <ContentForm>
        <img src={Logo} alt="logo" />
        <form>
          <input type="text" name="email" placeholder="Digite seu email" />
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button type="button">Logar</button>
          <Link to="/register"> Crirar conta</Link>
        </form>
      </ContentForm>
    </Container>
  );
}
