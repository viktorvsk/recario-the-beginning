import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import {connect} from "react-redux";

import {Spinner} from "native-base";

import AppNavigator from "./navigation/AppNavigator";

import {fetchSettings} from "./actions/settingsActions";

class Root extends React.Component {

    componentWillMount () {
        const {fetchSettings} = this.props;

        fetchSettings();
    }

    render () {
        const {isLoading} = this.props;

        return (isLoading ? <View style={{paddingTop: 25}}><Spinner /></View> : <AppNavigator />);
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.settings.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSettings: () => dispatch(fetchSettings())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

Root.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchSettings: PropTypes.func.isRequired
};