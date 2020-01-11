import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';

import Loading from '~/components/Loading';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatorio'),
  address: Yup.string().required('O endereço é obrigatorio'),
  profession: Yup.string().required('A função é obrigatoria'),
  email: Yup.string()
    .email()
    .required('O email é obrigatorio'),
  password: Yup.string()
    .min(6)
    .required('A senha é obrigatoria'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required()
          .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
      : field
  ),
});

export default function SignUpDoc() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data, { resetForm }) {
    try {
      setLoading(true);
      await api.post('doctors', data);
      toast.success('Funcionatio cadastrado com sucesso !!');
      setLoading(false);

      resetForm();
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <h1>Cadastrar novo Funcionario</h1>
      <section>
        <Form onSubmit={handleSubmit} schema={schema}>
          <div>
            <Input type="text" name="name" placeholder="Nome completo" />
          </div>
          <div>
            <Input type="text" name="address" placeholder="Endereço completo" />
          </div>
          <div>
            <Input type="text" name="profession" placeholder="Função" />
          </div>
          <div>
            <Input type="email" name="email" placeholder="E-mail de acesso" />
          </div>
          <div>
            <Input type="password" name="password" placeholder="Senha" />
          </div>
          <div>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirme a senha"
            />
          </div>
          <button type="submit">
            {loading ? <Loading size={20} /> : 'Cadastrar Funcionario'}
          </button>
        </Form>
      </section>
    </Container>
  );
}
