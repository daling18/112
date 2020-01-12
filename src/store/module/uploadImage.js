import {
  setPhotoAgreement,
  getPhotoAgreementStatus
} from 'src/api/uploadpictures';
export default {
  namespaced: true,
  state: {
    isAgree: false,
    agreed_time: '',
    user: {}
  },
  mutations: {
    setAgree(state, isAgree) {
      state.isAgree = isAgree
    },
    setAgreeTime(state, agreed_time) {
      state.agreed_time = agreed_time;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async getPhotoAgreementStatus({
      commit
    }) {
      let {
        code,
        data,
        msg
      } = await getPhotoAgreementStatus();

      if (code !== 0) {
        return Promise.reject(msg);
      }

      if (Array.isArray(data)) {
        commit('setAgree', false);
        return;
      }

      commit('setAgree', data.is_agreed);
      commit('setAgreeTime', data.agreed_time);
      commit('setUser', data.user);
      return Promise.resolve(data);
    },
    async signAgreement({
      dispatch,
      commit
    }) {
      let {
        code,
        data,
        msg
      } = await setPhotoAgreement({
        is_agreed: 1
      });
      if (code !== 0) {
        return Promise.reject(msg);
      }
      return Promise.resolve();
    }
  },

}
