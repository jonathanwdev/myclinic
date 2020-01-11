import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import AvatarInput from '~/components/AvatarInput';

import Loading from '~/components/Loading';
import {
  updateProfileRequest,
  deleteProfileRequest,
} from '~/store/modules/user/actions';

import { Container, FormGrid } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleDeleteUser(id) {
    if (
      window.confirm(`Tem certeza que deseja excluir sua conta ${user.name} ??`)
    ) {
      dispatch(deleteProfileRequest(id));
    }
  }
  return (
    <Container>
      <h1>Meu Perfil</h1>
      <section>
        <Form initialData={user} onSubmit={handleSubmit}>
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
            <button type="button" onClick={() => handleDeleteUser(user.id)}>
              Excluir minha conta
            </button>
          </footer>
        </Form>
      </section>
    </Container>
  );
}
