import { createStore, computed, action, thunk } from "easy-peasy";
import { StoreModel } from "../lib/types";

const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
});

export default store;
