import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { SnackbarProvider } from 'notistack';

// Bootstrap, MU, fonts, other style libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./assets/css/blk-design-system-react.css";
// import "./assets/css/nucleo-icons.css";
// import "./assets/scss/blk-design-system-react.scss?v=1.0.0";
// import "./assets/demo/demo.css";

// Router
import { HashRouter } from "react-router-dom";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import * as serviceWorker from "./serviceWorker";

import rootReducer from "./store/reducers/";

// Redux dev tools
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger),
    // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <SnackbarProvider maxSnack={3} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <App />
            </SnackbarProvider>
        </HashRouter>,
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
