import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Spinner} from "native-base";

import {modelFiltered, adsFiltered, loadModel} from "../../actions/modelActions";

import ModelScreen from "../screens/ModelScreen";

class ModelContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io",
      headerBackTitle: "Модель"
  }

  componentDidMount() {
      const navParams = this.props.navigation.state.params;
      if (typeof navParams === "undefined") { return; }
      this.props.loadModel(navParams.modelId);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
      const currentId = (this.props.navigation.state.params || {}).modelId;
      const nextId = (nextProps.navigation.state.params || {}).modelId;

      if (currentId !== nextId) {
          this.props.loadModel(nextId);
      }

  }

  render() {
      const {navigation, years, onChange, onFilter, ads, adsLoading, isLoading, currentYear, currentAdsFilters, filters, preview, settingsFilters, currentModelId, title} = this.props;

      if (isLoading) { return <Spinner />; }

      return(
          <ModelScreen title={title}
              currentModelId={currentModelId}
              currentYear={currentYear}
              adsLoading={adsLoading}
              years={years}
              ads={ads}
              onChange={onChange}
              onFilter={onFilter}
              currentAdsFilters={currentAdsFilters}
              filters={filters}
              preview={preview}
              settingsFilters={settingsFilters}
              nav={navigation}
          />

      );
  }
}

function mapStateToProps(state) {
    const currentModelId = state.model.currentPage;

    return {
        years: state.model.years,
        title: state.model.title,
        currentModelId: currentModelId,
        preview: state.settings.model_images[currentModelId] || "https://example.com/image-preview.jpg",
        settingsFilters: state.settings.filters,
        ads: state.ads.ads,
        adsLoading: state.ads.isLoading,
        isLoading: state.model.isLoading,
        currentYear: state.ads.currentYear,
        currentAdsFilters: state.model.adsFilters,
        filters: state.settings.filters || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (modelId, modelYear) => dispatch(modelFiltered(modelId, modelYear)),
        onFilter: (name, value) => { dispatch(adsFiltered(name, value)); },
        loadModel: (id) => { dispatch(loadModel(id)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelContainer);

ModelContainer.propTypes = {
    navigation: PropTypes.object.isRequired,
    years: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    ads: PropTypes.array.isRequired,
    adsLoading: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    currentYear: PropTypes.number,
    currentAdsFilters: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    preview: PropTypes.string,
    settingsFilters: PropTypes.object.isRequired,
    currentModelId: PropTypes.number,
    title: PropTypes.string,
    loadModel: PropTypes.func.isRequired
};
