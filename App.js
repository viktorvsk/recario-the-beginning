import React from "react";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";

import {Font} from "expo";


import Root from "./Root";

const store = configureStore();

export default class App extends React.Component {

    async componentWillMount () {
        await Font.loadAsync({Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")});
    }

    render () {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}
