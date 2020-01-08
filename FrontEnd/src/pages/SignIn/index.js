import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { AiOutlineLoading } from 'react-icons/ai';

import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';

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
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
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
          <button type="submit">
            {loading ? <AiOutlineLoading size={20} color="#fff" /> : 'Logar'}
          </button>
          <Link to="/register"> Crirar conta</Link>
        </Form>
      </ContentForm>
    </Container>
  );
}
