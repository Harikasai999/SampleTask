import { createStore } from "redux";
import rootReducer from "./src/Redux/reducers";

export default function configureStore() {
  let store = createStore(rootReducer);
  return store;
}
