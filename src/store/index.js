import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/token'
import { login, logout, register, getuserinfo } from '@/api/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {},
    token: getToken()
  },
  mutations: {
    SET_USERINFO(state, userinfo) {
      state.userinfo = userinfo;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    login({ commit }, form_data) {
      return login(form_data)
        .then(res => {
          const { data, code, message } = res;
          if (code == 200) {
            // let expires = new Date(new Date().getTime() + 4 * 3600 * 1000); // 4小时，与服务端同步（js-cookie默认是以天为单位，所以这里传递一个绝对时间进去）
            // setToken(data.token, { expires });
            setToken(data.token);
            commit("SET_TOKEN", data.token);
            return true;
          } else {
            return message;
          }
        })
        .catch(err => {
          // console.log(err);
          return err;
        });
    },
    register({ commit }, form_data) {
      return register(form_data)
        .then(res => {
          const { data, code, message } = res;
          if (code == 200) {
            // let expires = new Date(new Date().getTime() + 4 * 3600 * 1000); // 4小时，与服务端同步（js-cookie默认是以天为单位，所以这里传递一个绝对时间进去）
            // setToken(data.token, { expires });
            setToken(data.token);
            commit("SET_TOKEN", data.token);
            return true;
          } else {
            return message;
          }
        })
        .catch(err => {
          // console.log(err);
          return err;
        })
    },
    logout({ commit,dispatch }) {
      return logout()
        .then( async res => {
          await dispatch("removeToken");
          return true;
        })
        .catch(err => {
          // console.log(err);
          return false;
        })
    },
    getUserInfo({ commit }) {
      return getuserinfo()
        .then((res) => {
          const { data, code } = res;
          if (code != 200) {
            return false;
          } else {
            commit("SET_USERINFO", data);
            return true;
          }
        })
        .catch((err) => {
          // console.log(err);
          return false;
        });
    },
    removeToken({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "");
        commit("SET_USERINFO", {});
        removeToken();
        resolve();
      });
    }
  },
  modules: {
  }
})
