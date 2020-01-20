import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import { Container } from './styles';

export default function RegisterEmployee() {
  return (
    <Background>
      <Container />
    </Background>
  );
}

RegisterEmployee.navigationOptions = ({ navigation }) => ({
  title: 'Cadastrar Funcionario',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={30} color="#00FF2B" />
    </TouchableOpacity>
  ),

  headerStyle: {
    backgroundColor: '#08264A',
    height: 60,
  },
  headerTintColor: '#00FF2B',
  headerTitleStyle: 'bold',
  headerTitleAlign: 'center',
});
