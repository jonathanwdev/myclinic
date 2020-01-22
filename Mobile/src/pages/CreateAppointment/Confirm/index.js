import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative, addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation }) {
  const doctor = navigation.getParam('doctor');
  const time = navigation.getParam('time');
  const timeToNow = addHours(parseISO(time), 1);

  const dateFormatted = useMemo(
    () => formatRelative(timeToNow, new Date(), { locale: pt }),
    [timeToNow]
  );

  async function handleCreateAppointment() {
    try {
      await api.post('appointments', {
        doctor_id: doctor.id,
        date: time,
      });
      navigation.navigate('ClientDashboard');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: doctor.avatar
              ? doctor.avatar.url
              : `https://api.adorable.io/avatars/150/${doctor.name}.png`,
          }}
        />
        <Name>{doctor.name}</Name>
        <Time>{dateFormatted}</Time>
        <SubmitButton
          onPress={() => {
            Alert.alert('Confirmar', 'Confirma este horario ?', [
              {
                text: 'SIM',
                onPress: handleCreateAppointment,
                style: 'default',
              },
              {
                text: 'NÃO',
                onPress: () => {},
                style: 'default',
              },
            ]);
          }}
        >
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirme o Agendamento',
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
  headerTitleAlign: 'center',
  headerTintColor: '#00FF2B',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeftContainerStyle: {
    marginLeft: 20,
  },
});

Confirm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
