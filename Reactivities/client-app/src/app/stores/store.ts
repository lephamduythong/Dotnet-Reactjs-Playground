import { createContext, useContext } from "react";
import ActiviyStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
  activityStore: ActiviyStore;
  commonStore: CommonStore;
  userStore: UserStore;
}

export const store: Store = {
  activityStore: new ActiviyStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
};

export const storeContext = createContext(store);

export function useStore() {
  return useContext(storeContext);
}
