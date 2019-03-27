import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {signIn} from "../../actions/sessionsActions";

import SessionsScreen from "../screens/SessionsScreen";

class SessionsContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io", headerBackTitle: null
  }

  render() {
      const {token, onSignIn, navigation} = this.props;

      return(
          <SessionsScreen token={token} onSignIn={onSignIn} nav={navigation}/>
      );
  }
}

function mapStateToProps(state) {
    return {
        token: state.settings.accessToken
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSignIn: (phone, pass, callback) => dispatch(signIn(phone, pass, callback))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionsContainer);

SessionsContainer.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    token: PropTypes.string,
    navigation: PropTypes.object.isRequired
};

