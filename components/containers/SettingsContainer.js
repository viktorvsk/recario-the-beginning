import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {setAdsSource} from "../../actions/settingsActions";

import SettingsScreen from "../screens/SettingsScreen";

class SettingsContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io",
      headerBackTitle: "Настройки"
  }

  render() {
      const {adsSources, setAdsSource, currentAdsSourceId} = this.props;

      return(
          <SettingsScreen adsSources={adsSources} setAdsSource={setAdsSource} currentAdsSourceId={currentAdsSourceId} />
      );
  }
}

function mapStateToProps(state) {

    return {
        adsSources: state.settings.adsSources,
        currentAdsSourceId: state.settings.currentAdsSourceId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setAdsSource: (adsSourceId) => dispatch(setAdsSource(adsSourceId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);

SettingsContainer.propTypes = {
    adsSources: PropTypes.array.isRequired,
    setAdsSource: PropTypes.func.isRequired,
    currentAdsSourceId: PropTypes.number.isRequired
};

