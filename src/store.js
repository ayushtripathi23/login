import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  /* eslint-disable no-mixed-spaces-and-tabs */
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    posts: [],
    currentUser: '',
  },
  mutations: {
    SET_USERS(state, posts) {
      state.posts = posts;
    },
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
  },
  actions: {
    getPosts({ commit }) {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          commit('SET_USERS', response.data);
        });
    },
    sendPosts({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'https://jsonplaceholder.typicode.com/posts',
          data: data,
          method: 'POST',
        })
          .then((resp) => {
            console.log(resp);
            alert('success');
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    sendComment({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'https://jsonplaceholder.typicode.com/posts/1/comments',
          data: data,
          method: 'POST',
        })
          .then((resp) => {
            console.log(resp);
           
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'https://jsonplaceholder.typicode.com/users',
          data: user,
          method: 'GET',
        })
          .then((resp) => {
        
            const email = resp.data[0].email;
            this.state.currentUser = email;
            const token = resp.data[0].email;

            console.log('wokring');
            if (user.email == email) {
              localStorage.setItem('token', token);
           
              axios.defaults.headers.common['Authorization'] = token;
              commit('auth_success', user);
              resolve(resp);
            } else {
              alert('Unauthorised user');
            }
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    allPost: (state) => state.posts,
  },
});
