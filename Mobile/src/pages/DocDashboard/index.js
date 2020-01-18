import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import HeaderLogo from '~/components/HeaderLogo';
import Background from '~/components/Background';
import DateTimeInput from '~/components/DateTimeInput';

import { Container } from './styles';

export default function DocDashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#08264A" />
      <Container>
        <DateTimeInput date={date} onChange={setDate} />
      </Container>
    </Background>
  );
}

DocDashboard.navigationOptions = {
  headerTitle: () => <HeaderLogo />,
  headerStyle: {
    backgroundColor: '#08264A',
    height: 60,
  },
  headerTitleAlign: 'center',
};
