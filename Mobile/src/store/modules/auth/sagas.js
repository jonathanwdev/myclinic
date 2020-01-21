import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Erro', err.response.data.error);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { data } = payload;
    yield call(api.post, 'users', data);
    yield put(signUpSuccess());
    Alert.alert('Sucesso', 'Cadastro efetuado com sucesso!');
    // history.push('/login');
  } catch (err) {
    Alert.alert('Erro', err.response.data.error);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
