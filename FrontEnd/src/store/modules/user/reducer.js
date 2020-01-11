import { produce } from 'immer';

const INITIAL_STATE = {
  profile: null,
  loadind: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }

      case '@user/UPDATE_PROFILE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        draft.loading = false;
        break;
      }
      case '@user/DELETE_PROFILE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/DELETE_PROFILE_SUCCESS': {
        draft.profile = null;
        draft.loading = false;
        break;
      }

      case '@user/FAILURE': {
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }

      default:
    }
  });
}
