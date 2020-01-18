import React from 'react';
import { Text } from 'react-native';

import HeaderLogo from '~/components/HeaderLogo';
import Background from '~/components/Background';

// import { Container } from './styles';

export default function ClientDashboard() {
  return (
    <Background>
      <Text>CLIENTE</Text>
    </Background>
  );
}

ClientDashboard.navigationOptions = {
  headerTitle: () => <HeaderLogo />,
  headerStyle: {
    backgroundColor: '#08264A',
    height: 70,
  },
  headerTitleAlign: 'center',
};
