import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';

import Notifications from '~/components/Notifications';
import { Container, Menu } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);

  function handleSingOu() {
    dispatch(signOut());
  }

  return (
    <Container>
      <aside>
        <Notifications />

        <Menu>
          <div>
            <strong>
              {profile.doctor ? `Dr(a). ${profile.name}` : profile.name}
            </strong>
            <Link to="/profile">Meu Perfil</Link>
          </div>
          <img
            src={
              profile.avatar
                ? profile.avatar.url
                : 'https://api.adorable.io/avatars/50/abott@adorable.png'
            }
            alt="profile"
          />

          <button type="button" onClick={handleSingOu}>
            Sair
          </button>
        </Menu>
      </aside>
    </Container>
  );
}
