import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const isDoctor = useSelector(state => state.user.profile.doctor);
  const Routes = createRouter(signed, isDoctor);
  return <Routes />;
}
