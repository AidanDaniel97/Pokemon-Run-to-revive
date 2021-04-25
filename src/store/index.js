import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    runs: {},
    user: null,
  },
  mutations: {
    setRuns(state, runs) {
      state.runs = runs;
      console.log(runs);
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    runs: (state) => {
      return state.runs;
    },
    user: (state) => {
      return state.user;
    },
  },
  plugins: [new VuexPersistence().plugin],
});
