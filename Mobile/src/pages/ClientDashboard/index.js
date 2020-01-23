/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import { Alert, StatusBar } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import { format, addDays, subDays, parseISO, addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import HeaderLogo from '~/components/HeaderLogo';
import Background from '~/components/Background';
import { Loading, TextLoading } from '~/components/Loading';

import {
  Container,
  DateControl,
  DateButton,
  DateText,
  Appointment,
  AppointmentList,
  Profile,
  ProfileDetails,
  Name,
  Time,
  Profession,
  Avatar,
  CancellationButton,
} from './styles';

function ClientDashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [appointmens, setAppointmens] = useState([]);
  const formattedDate = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function loadAppointments() {
    try {
      setLoading(true);
      const response = await api.get('appointments', {
        params: {
          date: date.getTime(),
        },
      });
      const data = response.data.map(appointment => ({
        ...appointment,
        formattedTime: format(
          addHours(parseISO(appointment.date), 1.2),
          "'Dia' dd' de 'MMMM' de 'yyyy' ás 'HH'h'",
          {
            locale: pt,
          }
        ),
      }));
      setLoading(false);
      setAppointmens(data);
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isFocused]);

  function handleAddDay() {
    setDate(addDays(date, 1));
  }
  function handleRemoveDay() {
    setDate(subDays(date, 1));
  }

  async function handleCancellation(id) {
    try {
      await api.delete(`appointments/${id}`);
      const refreshList = appointmens.filter(app => app.id !== id);
      setAppointmens(refreshList);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }
  console.tron.log(appointmens);
  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#08264A" />
      <Container>
        <DateControl>
          <DateButton onPress={handleRemoveDay}>
            <Icon name="chevron-left" size={30} color="#36CB4F" />
          </DateButton>
          <DateText>{formattedDate}</DateText>
          <DateButton onPress={handleAddDay}>
            <Icon name="chevron-right" size={30} color="#36CB4F" />
          </DateButton>
        </DateControl>
        {loading ? (
          <Loading size="small" color="#fff" />
        ) : appointmens.length > 0 ? (
          <AppointmentList
            data={appointmens}
            keyExtractor={appointment => String(appointment.id)}
            renderItem={({ item: appointment }) => (
              <Appointment past={appointment.past}>
                <Profile>
                  <ProfileDetails>
                    <Name>Dr.(a) {appointment.doctor.name}</Name>
                    <Profession>#{appointment.doctor.profession}</Profession>
                    <Time>{appointment.formattedTime}</Time>
                  </ProfileDetails>
                  <Avatar
                    source={{
                      uri: appointment.doctor.avatar
                        ? appointment.doctor.avatar.url
                        : `https://api.adorable.io/avatars/50/${appointment.doctor.name}.png`,
                    }}
                  />
                </Profile>
                <CancellationButton
                  past={appointment.past}
                  enabled={appointment.cancelable}
                  onPress={() =>
                    appointment.cancelable
                      ? Alert.alert('Cancelamento', 'Tem certeza disso ?', [
                          {
                            text: 'SIM',
                            onPress: () => handleCancellation(appointment.id),
                            style: 'destructive',
                          },
                          {
                            text: 'NÃO',
                            onPress: () => {},
                          },
                        ])
                      : {}
                  }
                >
                  {appointment.cancelable ? ' Cancelavel' : 'Não cancelável'}
                </CancellationButton>
              </Appointment>
            )}
          />
        ) : (
          <TextLoading color="#fff">
            Não há agendamentos para esta data
          </TextLoading>
        )}
      </Container>
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

export default withNavigationFocus(ClientDashboard);
