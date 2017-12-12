import * as types from './mutation-types';

export const mutations = {
  [types.REGISTER](state, userPayload) {
    state.user = userPayload;
  },
  [types.GET_ADMIN](state, adminPayload) {
    state.admin = adminPayload;
  },
  [types.GET_LIST](state, listPayload) {
    state.list = listPayload;
  },
  [types.LOGOUT](state) {
    state.admin = {};
  },
};
