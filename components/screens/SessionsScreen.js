import React from "react";
import PropTypes from "prop-types";
import {Text} from "native-base";

import Login from "../Login";

export default class SessionsScreen extends React.PureComponent {
    render () {
        const {token, onSignIn, nav} = this.props;

        return(
            <React.Fragment>
                <Text>{token}</Text>
                <Login onSignIn={onSignIn} nav={nav}/>
            </React.Fragment>
        );
    }
}

SessionsScreen.propTypes = {
    token: PropTypes.string,
    onSignIn: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
};
