import React from "react";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";

import Root from "./Root";

const store = configureStore();

export default class App extends React.Component {

    render () {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}
