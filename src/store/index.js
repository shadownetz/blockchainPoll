import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import poll from "./modules/poll";
import auth from "./modules/auth";
import user from "./modules/user";

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    poll,
    auth,
    user
  }
})

export default store
