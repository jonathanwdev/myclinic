import React from 'react';
import { useSelector } from 'react-redux';

import ClientBox from './ClientBox';
import DoctorBox from './DoctorBox';

import { Container } from './styles';

export default function Dashboard() {
  const user = useSelector(state => state.user.profile);

  return <Container>{user.doctor ? <DoctorBox /> : <ClientBox />}</Container>;
}
