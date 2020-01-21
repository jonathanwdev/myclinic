import { call, put, takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { Failure, updateProfileSuccess, deleteProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const {
      name,
      email,
      profession,
      address,
      avatar_id,
      ...rest
    } = payload.data;
    // eslint-disable-next-line prefer-object-spread
    const profile = Object.assign(
      { name, email, profession, address, avatar_id },
      rest.oldPassword ? rest : {}
    );
    const response = yield call(api.put, 'users', profile);
    toast.success('Perfil atualizado com sucesso');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(Failure());
  }
}

export function* deleteProfile() {
  try {
    history.push('/');
    yield put(deleteProfileSuccess());
    yield call(api.delete, 'users');
    toast.error('Adeusss :(');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(Failure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/DELETE_PROFILE_REQUEST', deleteProfile),
]);
