import React from "react";
import Home from "./screens/home";
import store from "../redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Home></Home>
    </Provider>
  );
};

export default App;
