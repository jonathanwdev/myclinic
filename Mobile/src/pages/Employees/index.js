import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { Alert, Text } from 'react-native';
import api from '~/services/api';

import HeaderLogo from '~/components/HeaderLogo';
import Background from '~/components/Background';

import {
  Container,
  DoctorsList,
  Doctor,
  Info,
  Name,
  AboutDoc,
  Profession,
  FiredButton,
  Avatar,
  RegisterButton,
} from './styles';

function Employees({ navigation, isFocused }) {
  const [doctors, setDoctors] = useState([]);

  async function loadDocstors() {
    try {
      const response = await api.get('doctors');
      setDoctors(response.data);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadDocstors();
    }
  }, [isFocused]);

  async function handleFireDoctor(id) {
    try {
      await api.delete(`doctors/${id}`);
      const refreshList = doctors.filter(doc => doc.id !== id);
      setDoctors(refreshList);
      Alert.alert('Sucesso!', 'Funcionario demitido com sucesso !');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  return (
    <Background>
      <Container>
        <DoctorsList
          data={doctors}
          keyExtractor={doctor => String(doctor.id)}
          renderItem={({ item: doctor }) => (
            <Doctor>
              <Info>
                <Name>Dr.(a) {doctor.name}</Name>
                <AboutDoc>
                  <Profession>#{doctor.profession}</Profession>
                  <FiredButton
                    onPress={() =>
                      Alert.alert(
                        'Demitir',
                        `Você deseja mesmo demitir o(a) ${doctor.name} ?`,
                        [
                          {
                            text: 'SIM',
                            onPress: () => handleFireDoctor(doctor.id),
                            style: 'destructive',
                          },
                          {
                            text: 'NÃO',
                          },
                        ]
                      )
                    }
                  >
                    <Text style={{ color: '#CB3669' }}>DEMITIR</Text>
                  </FiredButton>
                </AboutDoc>
              </Info>
              <Avatar
                source={{
                  uri: doctor.avatar
                    ? doctor.avatar.url
                    : `https://api.adorable.io/avatars/50/${doctor.name}.png`,
                }}
              />
            </Doctor>
          )}
        />
        <RegisterButton
          onPress={() => {
            navigation.navigate('RegisterEmployee');
          }}
        >
          Cadastrar funcionario
        </RegisterButton>
      </Container>
    </Background>
  );
}

Employees.navigationOptions = {
  headerTitle: () => <HeaderLogo />,
  headerStyle: {
    backgroundColor: '#08264A',
    height: 60,
  },
  headerTitleAlign: 'center',
};

Employees.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(Employees);
