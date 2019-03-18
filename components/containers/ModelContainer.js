import React from "react";
import PropTypes from "prop-types";
import {NavigationEvents} from "react-navigation";
import ModelScreen from "../screens/ModelScreen";
import {connect} from "react-redux";

import {modelFiltered, adsFiltered, loadModel} from "../../actions/modelActions";

class ModelContainer extends React.PureComponent {
  static navigationOptions = {
    title: "reCar.io",
    headerBackTitle: "Модель"
  }

    componentDidMount() {
        const navParams = this.props.navigation.state.params;
        if (typeof navParams === "undefined") { return }
        this.props.loadModel(navParams.modelId);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const currentId = (this.props.navigation.state.params || {}).modelId;
        const nextId = (nextProps.navigation.state.params || {}).modelId;

        if (currentId !== nextId) {
          this.props.loadModel(nextId)
        }

    }

    render() {
        const {navigation, years, onChange, onFilter, ads, adsLoading, modelLoading, currentYear, currentAdsFilters, filters, preview, settingsFilters, currentModelId, title} = this.props;
        return(
            <ModelScreen
                title={title}
                currentModelId={currentModelId}
                currentYear={currentYear}
                adsLoading={adsLoading}
                modelLoading={modelLoading}
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

function mapStateToProps(state, props) {
    const currentModelId = state.model.currentPage;

    return {
        years: state.model.years,
        title: state.model.title,
        currentModelId: currentModelId,
        preview: currentModelId && state.settings.model_images[String(currentModelId)],
        settingsFilters: state.settings.filters,
        ads: (state.ads[currentModelId] || {}).results || [],
        adsLoading: state.ads.isLoading,
        modelLoading: state.model.isLoading,
        currentYear: (state.ads[currentModelId] || {}).currentYear,
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
