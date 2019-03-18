import React from "react";
import PropTypes from "prop-types";
import {NavigationEvents} from "react-navigation";
import AdScreen from "../screens/AdScreen";
import {connect} from "react-redux";

import {loadAd} from "../../actions/adsActions";

class AdContainer extends React.PureComponent {
  static navigationOptions = {
    title: "reCar.io"
  }

    componentDidMount() {
        const navParams = this.props.navigation.state.params;
        if (typeof navParams === "undefined") { return }
        this.props.loadAd(navParams.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const currentId = (this.props.navigation.state.params || {}).id;
        const nextId = (nextProps.navigation.state.params || {}).id;

        if (currentId !== nextId) {
          this.props.loadAd(nextId)
        }

    }

    render() {
        const {navigation, isLoading, ad, settingsFilters} = this.props;
        return(
            <AdScreen
                nav={navigation}
                isLoading={isLoading}
                ad={ad}
                filters={settingsFilters}
            />

        );
    }
}

function mapStateToProps(state, props) {
    const currentAdId = (props.navigation.state.params || {}).id;

    return {
        isLoading: state.ads.isLoading,
        ad: state.ads.currentAd,
        settingsFilters: state.settings.filters

    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAd: (id) => { dispatch(loadAd(id)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdContainer);
