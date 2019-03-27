import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Spinner} from "native-base";

import {loadAd, askFriend} from "../../actions/adsActions";

import AdScreen from "../screens/AdScreen";

class AdContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io", headerBackTitle: null
  }

  componentDidMount() {
      const navParams = this.props.navigation.state.params;
      if (typeof navParams === "undefined") { return; }
      this.props.loadAd(navParams.id);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
      const currentId = (this.props.navigation.state.params || {}).id;
      const nextId = (nextProps.navigation.state.params || {}).id;

      if (currentId !== nextId) {
          this.props.loadAd(nextId);
      }

  }

  render() {
      const {navigation, isLoading, ad, settingsFilters, askFriend} = this.props;

      if (isLoading) { return <Spinner/>; }

      return(
          <AdScreen nav={navigation} ad={ad} filters={settingsFilters} askFriend={askFriend}/>
      );
  }
}

function mapStateToProps(state) {
    return {
        isLoading: state.ads.isLoading,
        ad: state.ads.currentAd,
        settingsFilters: state.settings.filters
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAd: (id) => { dispatch(loadAd(id)); },
        askFriend: (adId, friendId) => { dispatch(askFriend(adId, friendId)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdContainer);

AdContainer.propTypes = {
    navigation: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    ad: PropTypes.object.isRequired,
    settingsFilters: PropTypes.object.isRequired,
    loadAd: PropTypes.func.isRequired,
    askFriend: PropTypes.func.isRequired
};
