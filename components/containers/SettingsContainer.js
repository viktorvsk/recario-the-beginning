import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {setAdsSource} from "../../actions/settingsActions";
import {signOut} from "../../actions/sessionsActions";

import SettingsScreen from "../screens/SettingsScreen";

class SettingsContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io", headerBackTitle: null
  }

  render() {
      const {adsSources, setAdsSource, currentAdsSourceId, token, onSignOut} = this.props;

      return(
          <SettingsScreen adsSources={adsSources} setAdsSource={setAdsSource} currentAdsSourceId={currentAdsSourceId} onSignOut={onSignOut} token={token}/>
      );
  }
}

function mapStateToProps(state) {

    return {
        adsSources: state.settings.adsSources,
        currentAdsSourceId: state.settings.currentAdsSourceId,
        token: state.settings.accessToken
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setAdsSource: (adsSourceId) => dispatch(setAdsSource(adsSourceId)),
        onSignOut: (token) => dispatch(signOut(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);

SettingsContainer.propTypes = {
    adsSources: PropTypes.array.isRequired,
    setAdsSource: PropTypes.func.isRequired,
    currentAdsSourceId: PropTypes.number.isRequired,
    onSignOut: PropTypes.func.isRequired,
    token: PropTypes.string
};

