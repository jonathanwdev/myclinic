/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import { Loading, TextLoading } from '~/components/Loading';

import {
  Container,
  DoctorList,
  Doctor,
  Avatar,
  Name,
  Profession,
  Address,
} from './styles';

export default function SelectDoctor({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function loadDoctors() {
      try {
        setLoading(true);
        const response = await api.get('doctors');
        setLoading(false);
        setDoctors(response.data);
      } catch (err) {
        Alert.alert('Erro', err.response.data.error);
      }
    }
    loadDoctors();
  }, []);

  return (
    <Background>
      <Container>
        {loading ? (
          <Loading color="#fff" size="small" />
        ) : doctors.length > 0 ? (
          <DoctorList
            data={doctors}
            keyExtractor={doctor => String(doctor.id)}
            renderItem={({ item: doctor }) => (
              <Doctor
                onPress={() => {
                  navigation.navigate('SelectDateTime', { doctor });
                }}
              >
                <Avatar
                  source={{
                    uri: doctor.avatar
                      ? doctor.avatar.url
                      : `https://api.adorable.io/avatars/50/${doctor.name}.png`,
                  }}
                />
                <Name numberOfLines={1} ellipsizeMode="tail">
                  Dr.(a) {doctor.name}
                </Name>
                <Profession>#{doctor.profession}</Profession>
                <Address>{doctor.address}</Address>
              </Doctor>
            )}
          />
        ) : (
          <TextLoading color="#fff">Não há doutores cadastrados</TextLoading>
        )}
      </Container>
    </Background>
  );
}

SelectDoctor.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o Dentista',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ClientDashboard');
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

SelectDoctor.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
