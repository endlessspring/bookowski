import RootStore, { RootStoreInstance } from "./../models/RootStore";

export const useStore = (): RootStoreInstance => {
  return RootStore;
};
