import React from "react";
import {View} from "react-native";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";

import {notification} from "./Utils";

import Notification from "./components/Notification";

import {Font} from "expo";


import Root from "./Root";

const store = configureStore();

export default class App extends React.Component {

    async componentWillMount () {
        await Font.loadAsync({Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")});
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <Notification ref={ref => notification.ref = ref}/>
                <Provider store={store}>
                    <Root />
                </Provider>
            </View>
        );
    }
}
