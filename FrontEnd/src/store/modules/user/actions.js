export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function deleteProfileRequest(id) {
  return {
    type: '@user/DELETE_PROFILE_REQUEST',
    payload: { id },
  };
}

export function deleteProfileSuccess() {
  return {
    type: '@user/DELETE_PROFILE_SUCCESS',
  };
}

export function Failure() {
  return {
    type: '@user/FAILURE',
  };
}
