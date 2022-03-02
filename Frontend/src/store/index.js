import { createStore, storeKey } from 'vuex'

import { instance } from '../api'

const store = createStore({
  state: {
    status: '',
    user: {
      id: -1,
      token: '',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, userInfos) {
      state.user = user;
    }
  },


  actions: {
    login:({commit}, userInfos) => {
      commit('setStatus', 'loading');
    return new Promise((resolve, reject) => {
      instance.post('/login', userInfos)
      .then(function (error) {
        commit('setStatus', 'error_login');
        commit('logUser', response.data);
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
    });
    },
    createAccount: ({commit}, userInfos) => {
      commit;
      //console.log(userInfos);
      instance.post('/createAccount', userInfos)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
})

export default store;
