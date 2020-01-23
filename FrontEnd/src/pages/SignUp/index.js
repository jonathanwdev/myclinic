import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import Loading from '~/components/Loading';
import { signUpRequest } from '~/store/modules/auth/actions';

import Logo from '~/assets/logoForm.svg';

import { Container, ContentForm } from './styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O email é obrigatorio')
    .min(6, 'No minimo 6 caracteres'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatorio'),
  password: Yup.string()
    .required('O email é obrigatorio')
    .min(6, 'No minimo 6 caracteres'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required()
          .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
      : field
  ),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit(data) {
    dispatch(signUpRequest(data));
  }
  return (
    <Container>
      <ContentForm>
        <img src={Logo} alt="logo" />
        <Form onSubmit={handleSubmit} schema={schema}>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
          />
          <button type="submit">
            {loading ? <Loading size={20} /> : 'CADASTRAR'}
          </button>
          <Link to="/login"> Já tenho uma conta</Link>
        </Form>
      </ContentForm>
    </Container>
  );
}
