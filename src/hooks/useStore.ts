import RootStore, { RootStoreInstance } from "../models/Root.store";

export const useStore = (): RootStoreInstance => {
  return RootStore;
}; 
