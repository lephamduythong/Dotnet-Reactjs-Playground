import { createContext, useContext } from "react";
import ActiviyStore from "./activityStore";

interface Store {
    activityStore: ActiviyStore
}

export const store: Store = {
    activityStore: new ActiviyStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}