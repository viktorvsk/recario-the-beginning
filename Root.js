import React from "react";
import PropTypes from "prop-types";
import {View, Text} from "react-native";
import {connect} from "react-redux";
import {Spinner} from "native-base";

import * as ActionTypes from "./actions/actionTypes";

import AppNavigator from "./navigation/AppNavigator";

import {fetchSettings} from "./actions/settingsActions";
import API from "./services/API";

import {getAccessToken} from "./AsyncStorage";

class Root extends React.Component {

    componentWillMount () {
        const {fetchSettings} = this.props;

        fetchSettings();
        getAccessToken().then(token => {
            if (token) { this.props.setCachedToken(token); }
        });
    }

    render () {
        const {isLoading, initializeFailed} = this.props;

        if (initializeFailed) { return <View style={{paddingTop: 25}}><Text>Произошла ошибка загрузки данных с сервера. Пожалуйста, перезагрузите приложение. Извините за неудобства, мы уже работаем над устранением проблемы.</Text></View>;}

        return (isLoading ? <View style={{paddingTop: 25}}><Spinner /></View> : <AppNavigator />);
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.settings.isLoading,
        initializeFailed: state.settings.initializeFailed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSettings: () => dispatch(fetchSettings()),
        setCachedToken: (token) => {
            API.setAccessToken(token);
            dispatch({type: ActionTypes.SIGN_IN_SUCCESS, token: token});
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

Root.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    initializeFailed: PropTypes.bool.isRequired,
    fetchSettings: PropTypes.func.isRequired,
    setCachedToken: PropTypes.func.isRequired
};