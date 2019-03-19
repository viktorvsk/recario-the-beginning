import {createSwitchNavigator, createAppContainer} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

const AppNavigator = createSwitchNavigator({
    Main: MainTabNavigator,
});

export default createAppContainer(AppNavigator);
