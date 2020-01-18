import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

/** Routes for both users */
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';

/** Routes for Doctors */
import DocDashboard from '~/pages/DocDashboard';
import Employees from '~/pages/Employees';

/** Routes for Clients */
import ClientDashboard from '~/pages/ClientDashboard';

export default (signedIn = false, isDoctor) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        DocApp: createBottomTabNavigator(
          {
            Employees: {
              screen: createStackNavigator({
                Employees,
              }),
              navigationOptions: {
                tabBarLabel: 'Meus Funcionarios',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="group" size={20} color={tintColor} />
                ),
              },
            },
            DocDashboard: {
              screen: createStackNavigator({
                DocDashboard,
              }),
              navigationOptions: {
                tabBarLabel: 'Agenda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="event-note" size={20} color={tintColor} />
                ),
              },
            },
            Profile: {
              screen: createStackNavigator({
                Profile,
              }),
              navigationOptions: {
                tabBarLabel: 'Meu Perfil',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="person-pin" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#00FF2B',
              inactiveTintColor: 'rgba(35, 160, 257, 0.9)',
              style: {
                backgroundColor: 'rgba(8,38,74,0.91)',
              },
            },
          }
        ),
        ClientApp: createBottomTabNavigator(
          {
            ClientDashboard,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#00FF2B',
              inactiveTintColor: 'rgba(35, 160, 257, 0.9)',
              style: {
                backgroundColor: 'rgba(8,38,74,0.91)',
              },
            },
          }
        ),
      },
      {
        initialRouteName:
          signedIn && isDoctor
            ? 'DocApp'
            : signedIn && !isDoctor
            ? 'ClientApp'
            : 'Sign',
      }
    )
  );
