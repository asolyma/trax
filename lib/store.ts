import { createStore, action } from "easy-peasy";
import { StoreModel } from "../lib/types";
const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  volume: 1.5,
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
  chanevolume: action((state, payload) => {
    state.volume = payload;
  }),
});

export default store;
