import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    runs: [],
    user: null,
  },
  mutations: {
    setRuns(state, runs) {
      for (var run in runs) {
        if (!state.runs.find((x) => x.id === runs[run].id)) {
          runs[run]["cashedInRun"] = false;
          state.runs.push(runs[run]);
        }
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    cashInRun(state, data) {
      console.log(state.runs);
      state.runs.find((x) => x.id === data.run.id).cashedInRun = data.value;
    },
  },
  getters: {
    runs: (state) => {
      return state.runs.sort(function(a, b) {
        var dateA = new Date(a.start_date),
          dateB = new Date(b.start_date);
        return dateB - dateA;
      });
    },
    user: (state) => {
      return state.user;
    },
  },
  plugins: [new VuexPersistence().plugin],
});
