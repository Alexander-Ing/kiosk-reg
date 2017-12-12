import axios from 'axios';
import * as types from './mutation-types';

export const register = ({ commit }, userPayload) => {
  return new Promise((resolve, reject) => {
    fetch('/api/users/register', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPayload)
    })
    .then((res) => {
      resolve(res);
    })
    .then((err) => {
      reject(err);
    });
  });
};

export const registerAdmin = ({ commit }, adminPayload) => {
  console.log('called registerAdmin!');
  return new Promise((resolve, reject) => {
    fetch('/api/admin/register', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminPayload)
    })
    .then((res) => {
      resolve(res);
    })
    .then((err) => {
      reject(err);
    });
  });
};

export const getList = ({ commit }) => {
  axios.get('/api/admin/list')
  .then(function (response) {
    commit(types.GET_LIST, response.data);
  })
  .catch((error) => {
    console.log(error);
  });
};

export const getUser = ({ commit }) => {
  axios.get('/api/admin/isauth')
  .then(function (response) {
    commit(types.GET_ADMIN, response.data);
  })
  .catch((error) => {
    console.log(error);
  });
};

export const logout = ({ commit }) => {
  axios.get('/api/admin/logout')
  .then(function (response) {
    commit(types.LOGOUT);
  })
  .catch((error) => {
    console.log(error);
  });
};
