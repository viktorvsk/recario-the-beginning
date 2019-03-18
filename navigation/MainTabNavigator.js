import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import FiltersContainer from "../components/containers/FiltersContainer";
import SearchContainer from "../components/containers/SearchContainer";
import ModelContainer from "../components/containers/ModelContainer";
import AdContainer from "../components/containers/AdContainer";
import AdsListContainer from "../components/containers/AdsListContainer";
import SearchModelContainer from "../components/containers/SearchModelContainer";


const SearchStack = createStackNavigator({
    Filters: FiltersContainer,
    SearchResults: SearchContainer,
    Model: ModelContainer,
    AdsList: AdsListContainer,
    Ad: AdContainer
}, {initialRouteName: "Filters"});

SearchStack.navigationOptions = {
    tabBarLabel: "Поиск",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='ios-search'
        />
    ),
};

const ModelStack = createStackNavigator({
    SearchModel: SearchModelContainer
});

ModelStack.navigationOptions = {
    tabBarLabel: "Модель",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-car" : "md-options"}
        />
    ),
};

export default createBottomTabNavigator({
    SearchStack,
    ModelStack
});
