import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    signed: false,
    userInfo: {},
    env: ''
};

const mutations = {
    updateUserInfo(store, data) {
        store.userInfo = data;
    },
    updateEnv(store, env) {
        store.env = env;
    }
 };

const actions = { };

const getters = {
    getUserInfo(store) {
        return store.userInfo
    },
    getEnv(store) {
        return store.env
    }
};


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});