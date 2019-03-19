import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Dimensions} from "react-native";
import {DataProvider, LayoutProvider} from "recyclerlistview";

import {loadAd} from "../../actions/adsActions";

import {filterAds} from "../../Utils";

import AdsListScreen from "../screens/AdsListScreen";

import AdCar from "../AdCar";

class AdsListContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io",
      headerBackTitle: "Объявления"
  }
  render() {
      const {loadAd, navigation, ads, settingsFilters, title, currentAdsFilters} = this.props;
      const adsToShow = filterAds(ads, currentAdsFilters);
      const dataProvider = new DataProvider((r1, r2) => r1.key !== r2.key);
      const rowRenderer = (type, data) => <AdCar filters={settingsFilters} ad={data} nav={navigation} onPress={() => {loadAd(data.id); navigation.push("Ad");}}/>;
      const layoutProvider = new LayoutProvider(
          () => 0,
          (type, dim) => {
              dim.width = Dimensions.get("window").width;
              dim.height = 470;
          }
      );

      return(
          <AdsListScreen dataProvider={dataProvider}
                         rowRenderer={rowRenderer}
                         layoutProvider={layoutProvider}
                         ads={adsToShow}
                         title={title}
          />
      );
  }
}

function mapStateToProps(state) {
    return {
        title: `${state.model.title} ${(state.ads[state.model.currentPage] || {}).currentYear}`,
        settingsFilters: state.settings.filters,
        ads: (state.ads[state.model.currentPage] || {}).results || [],
        currentAdsFilters: state.model.adsFilters,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAd: (id) => { dispatch(loadAd(id)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsListContainer);

AdsListContainer.propTypes = {
    loadAd: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    ads: PropTypes.array.isRequired,
    settingsFilters: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    currentAdsFilters: PropTypes.object.isRequired
};
