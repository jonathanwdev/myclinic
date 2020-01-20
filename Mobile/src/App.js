import React from 'react';
import { YellowBox } from 'react-native';
import { useSelector } from 'react-redux';

import createRouter from './routes';

YellowBox.ignoreWarnings(['Warning: DatePickerAndroid has been merged']);

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const isDoctor = useSelector(state => state.user.profile.doctor);
  const Routes = createRouter(signed, isDoctor);
  return <Routes />;
}
