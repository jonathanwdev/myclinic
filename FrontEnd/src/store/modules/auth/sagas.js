import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

import api from '~/services/api';
import history from '~/services/history';

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

    toast.success('Seja bem vindo(a)');
    history.push('/dashboard');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { data } = payload;
    yield call(api.post, 'users', data);
    toast.success('Paciente cadastrado com sucesso');
    yield put(signUpSuccess());
    history.push('/login');
  } catch (err) {
    toast.error(err.response.data.error);
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
export function signOut() {
  history.push('/login');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
