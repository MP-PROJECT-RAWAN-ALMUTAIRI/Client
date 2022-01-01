import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react'
import App from "./App";
import store from "./reducers";

ReactDOM.render(
  <ChakraProvider>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
</ChakraProvider>,
  document.getElementById("root")); 