import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { subHours } from 'date-fns';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import { Loading } from '~/components/Loading';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation }) {
  const dateWithSub = subHours(new Date(), 1);
  const [date, setDate] = useState(dateWithSub);
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(false);

  const doctor = navigation.getParam('doctor');

  useEffect(() => {
    async function loadSchedule() {
      try {
        setLoading(true);
        const response = await api.get(`doctors/${doctor.id}/available`, {
          params: {
            date: date.getTime(),
          },
        });
        setLoading(false);
        setHours(response.data);
      } catch (err) {
        Alert.alert('Erro', err.response.data.error);
      }
    }
    loadSchedule();
  }, [date, doctor.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      doctor,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        {loading ? (
          <Loading color="#fff" size="small" />
        ) : (
          <HourList
            data={hours}
            keyExtractor={item => item.time}
            renderItem={({ item }) => (
              <Hour
                enabled={item.available}
                onPress={() => handleSelectHour(item.value)}
              >
                <Title>{item.time}</Title>
              </Hour>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o Horario',
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

SelectDateTime.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
