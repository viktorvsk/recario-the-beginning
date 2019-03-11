import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import SearchContainer from "../components/containers/SearchContainer";
import ModelContainer from "../components/containers/ModelContainer";
import AdContainer from "../components/containers/AdContainer";

const AdStack = createStackNavigator({
    Ad: AdContainer,
});

AdStack.navigationOptions = {
    tabBarLabel: "Ad",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='ios-search'
        />
    ),
};

const SearchStack = createStackNavigator({
    Search: SearchContainer,
});

SearchStack.navigationOptions = {
    tabBarLabel: "Search",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='ios-list'
        />
    ),
};

const ModelStack = createStackNavigator({
    Model: ModelContainer,
});

ModelStack.navigationOptions = {
    tabBarLabel: "Model",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-car" : "md-options"}
        />
    ),
};

export default createBottomTabNavigator({
    AdStack,
    SearchStack,
    ModelStack,
});
