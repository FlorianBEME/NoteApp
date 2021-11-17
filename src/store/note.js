import { createStore } from 'vuex'

const note = createStore({
  state: {
    save: null,
  },
  mutations: {
    INIT_SAVE(state, newState) {
      state.save = newState;
    },
  },
  getters: {},
  actions: {
    innitSaveInStore(newState) {
      console.log("dans action");
      this.commit("INIT_SAVE", newState);
    },
  },
});

export default note;
