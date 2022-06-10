import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

    ReactDOM.render(
        <Provider store={store}>
                <App></App>
            </Provider>,
    document.getElementById('root')
);
