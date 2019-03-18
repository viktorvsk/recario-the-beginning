import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Dimensions} from "react-native";
import {DataProvider, LayoutProvider} from "recyclerlistview";
import {filterAds} from "../../Utils";

import {loadAd} from "../../actions/adsActions";

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
        const rowRenderer = (type, data) => <AdCar filters={settingsFilters} ad={data} nav={navigation} onPress={() => {loadAd(data.id); navigation.push('Ad')}}/>;
        const layoutProvider = new LayoutProvider(
            index => 0,
            (type, dim) => {
                dim.width = Dimensions.get('window').width;
                dim.height = 470;
            }
        );

        return(
            <AdsListScreen
                dataProvider={dataProvider}
                rowRenderer={rowRenderer}
                layoutProvider={layoutProvider}
                ads={adsToShow}
                title={title}
            />

        );
    }
}

function mapStateToProps(state, props) {
    return {
        title: `${state.model.title} ${(state.ads[state.model.currentPage] || {}).currentYear}`,
        settingsFilters: state.settings.filters,
        ads: (state.ads[state.model.currentPage] || {}).results || [],
        currentAdsFilters: state.model.adsFilters,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadModel: (id) => { dispatch(loadModel(id)); },
        loadAd: (id) => { dispatch(loadAd(id)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsListContainer);
