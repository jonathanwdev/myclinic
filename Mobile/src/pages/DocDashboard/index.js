/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import { Alert, StatusBar } from 'react-native';
import { format, addDays, subDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import HeaderLogo from '~/components/HeaderLogo';
import Background from '~/components/Background';
import { TextLoading, Loading } from '~/components/Loading';

import {
  Container,
  ScheduleList,
  Scheduled,
  DateControl,
  DateText,
  DateButton,
  Avatar,
  ClientName,
  Time,
  CalcelButton,
} from './styles';

export default function DocDashboard() {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const formattedDate = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  function handleAddDay() {
    setDate(addDays(date, 1));
  }
  function handleRemoveDay() {
    setDate(subDays(date, 1));
  }

  useEffect(() => {
    async function loadSchedule() {
      try {
        setLoading(true);
        const response = await api.get('schedule', {
          params: {
            date,
          },
        });
        const data = response.data.map(sch => ({
          ...sch,
          formattedTime: format(parseISO(sch.date), "'Ás 'hh':'mm", {
            locale: pt,
          }),
        }));
        setLoading(false);
        setSchedules(data);
      } catch (err) {
        Alert.alert('Erro', err.response.data.error);
      }
    }
    loadSchedule();
  }, [date]);

  async function cancelSchedule(id) {
    try {
      await api.delete(`schedule/${id}`);
      Alert.alert('Sucesso', 'Agendamento cancelado com sucesso !');
      const refreshList = schedules.filter(sche => sche.id !== id);
      setSchedules(refreshList);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

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
        ) : schedules.length > 0 ? (
          <ScheduleList
            data={schedules}
            keyExtractor={schedule => String(schedule.id)}
            renderItem={({ item: schedule }) => (
              <Scheduled past={schedule.past}>
                <Avatar
                  source={{
                    uri: schedule.user.avatar
                      ? schedule.user.avatar.url
                      : `https://api.adorable.io/avatars/50/${schedule.user.name}.png`,
                  }}
                />
                <ClientName>{schedule.user.name}</ClientName>
                <Time>{schedule.formattedTime}</Time>
                <CalcelButton
                  cancelable={!schedule.cancelable}
                  onPress={() =>
                    Alert.alert('Cancelarmento', 'Tem certeza disso ?', [
                      {
                        text: 'SIM',
                        onPress: () => cancelSchedule(schedule.id),
                        style: 'cancel',
                      },
                      {
                        text: 'NÃO',
                        onPress: () => {},
                      },
                    ])
                  }
                >
                  <Icon name="cancel" size={25} color="#CB3669" />
                </CalcelButton>
              </Scheduled>
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

DocDashboard.navigationOptions = {
  headerTitle: () => <HeaderLogo />,
  headerStyle: {
    backgroundColor: '#08264A',
    height: 60,
  },
  headerTitleAlign: 'center',
};
