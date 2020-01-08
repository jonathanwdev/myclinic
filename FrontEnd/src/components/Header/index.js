import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Navigation from './Navigation';
import Profile from './Profile';

import Logo from '~/assets/Logo.svg';

import { Container, Content } from './styles';

export default function UnsignedHeader() {
  const { signed } = useSelector(state => state.auth);
  return (
    <Container>
      <Content>
        <NavLink to="/">
          <img src={Logo} alt="logo" />
        </NavLink>
        {signed ? <Profile /> : <Navigation />}
      </Content>
    </Container>
  );
}
