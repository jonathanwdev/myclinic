import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import Logo from '~/assets/logoForm.svg';

import { Container, ContentForm } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatorio'),
  password: Yup.string()
    .required('O email é obrigatorio')
    .min(6, 'No minimo 6 caracteres'),
});
export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <Container>
      <ContentForm>
        <img src={Logo} alt="logo" />
        <Form onSubmit={handleSubmit} schema={schema}>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button type="submit">Logar</button>
          <Link to="/register"> Crirar conta</Link>
        </Form>
      </ContentForm>
    </Container>
  );
}
