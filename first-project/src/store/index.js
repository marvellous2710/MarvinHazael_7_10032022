import { createStore, storeKey } from 'vuex'

import { instance } from '../api'

const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
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