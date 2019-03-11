import React from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
import configureStore from "./store/configureStore";
import AppNavigator from "./navigation/AppNavigator";

const store = configureStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <AppNavigator />
                </View>
            </Provider>
        );
    }
}
