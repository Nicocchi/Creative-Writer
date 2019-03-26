import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Bootstrap, MU, fonts, other style libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./assets/css/blk-design-system-react.css";
// import "./assets/css/nucleo-icons.css";
// import "./assets/scss/blk-design-system-react.scss?v=1.0.0";
// import "./assets/demo/demo.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';



// Router
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import * as serviceWorker from "./serviceWorker";

import rootReducer from "./store/reducers/";

// Overall application theme
const theme = createMuiTheme({
    palette: {
        primary: { main: purple[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
});
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
        <Router>
                <App />
        </Router>
    </Provider>,
    rootElement
);

// ReactDOM.render(
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>,
//     rootElement
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
