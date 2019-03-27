/* eslint-disable */
import React from "react";
import {Platform } from "react-native";
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import FiltersContainer from "../components/containers/FiltersContainer";
import AdsListContainer from "../components/containers/AdsListContainer";
import SearchContainer from "../components/containers/SearchContainer";
import ModelContainer from "../components/containers/ModelContainer";
import AdContainer from "../components/containers/AdContainer";
import SearchModelContainer from "../components/containers/SearchModelContainer";
import SettingsContainer from "../components/containers/SettingsContainer";
import ContactsContainer from "../components/containers/ContactsContainer";

import TabBarIcon from "../components/TabBarIcon";

const SearchStack = createStackNavigator({
    Filters: FiltersContainer,
    SearchResults: SearchContainer,
    Model: ModelContainer,
    AdsList: AdsListContainer,
    Ad: AdContainer
}, {initialRouteName: "Filters"});

SearchStack.navigationOptions = {
    tabBarLabel: "Поиск",
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='ios-search'/>
};

const ModelStack = createStackNavigator({
    SearchModel: SearchModelContainer,
    Model: ModelContainer,
    AdsList: AdsListContainer,
    Ad: AdContainer
});

ModelStack.navigationOptions = {
    tabBarLabel: "Модель",
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-car" : "md-options"}/>
};

const SettingsStack = createStackNavigator({
    Settings: SettingsContainer
});

SettingsStack.navigationOptions = {
    tabBarLabel: "Настройки",
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}/>
};

const ContactsStack = createStackNavigator({
    Contacts: ContactsContainer
});

ContactsStack.navigationOptions = {
    tabBarLabel: "Друзья",
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-contacts" : "md-contacts"}/>
};

export default createBottomTabNavigator({
    SearchStack,
    ModelStack,
    ContactsStack,
    SettingsStack
});
