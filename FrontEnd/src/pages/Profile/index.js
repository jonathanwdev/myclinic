import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import AvatarInput from '~/components/AvatarInput';

import Loading from '~/components/Loading';
import {
  updateProfileRequest,
  deleteProfileRequest,
} from '~/store/modules/user/actions';

import { Container, FormGrid } from './styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O email é obrigatorio')
    .min(6, 'No minimo 6 caracteres'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatorio'),
  avatar_id: Yup.number(),
  address: Yup.string().min(6, 'No minimo 6 caracteres'),
  profession: Yup.string().min(6, 'No minimo 6 caracteres'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field.required('Campo obrigatorio').min(6, 'Minimo 6 caracteres')
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required()
          .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleDeleteUser() {
    if (
      window.confirm(`Tem certeza que deseja excluir sua conta ${user.name} ??`)
    ) {
      dispatch(deleteProfileRequest());
    }
  }
  return (
    <Container>
      <h1>Meu Perfil</h1>
      <section>
        <Form schema={schema} initialData={user} onSubmit={handleSubmit}>
          <AvatarInput name="avatar_id" />

          <FormGrid>
            <div>
              <Input type="text" name="name" placeholder="Digite seu nome" />
            </div>
            <div>
              <Input
                type="text"
                name="address"
                placeholder="Digite seu endereço"
              />
            </div>
            {user.doctor ? (
              <div>
                <Input
                  type="text"
                  name="profession"
                  placeholder="Digite sua profissão"
                />
              </div>
            ) : null}
            <div>
              <Input type="email" name="email" placeholder="Digite seu email" />
            </div>
          </FormGrid>
          <hr />

          <FormGrid>
            <div>
              <Input
                type="password"
                name="oldPassword"
                placeholder="Sua senha antiga"
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Sua nova senha"
              />
            </div>
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirme sua nova senha"
              />
            </div>
          </FormGrid>
          <footer>
            <button type="submit">
              {loading ? <Loading size={20} /> : 'Atualizar dados'}
            </button>
            <button type="button" onClick={() => handleDeleteUser()}>
              Excluir minha conta
            </button>
          </footer>
        </Form>
      </section>
    </Container>
  );
}
