import {Instance, types} from "mobx-state-tree";

export type RootStoreInstance = Instance<typeof RootStore>;

const RootStore = types.model({});

export default RootStore.create();
