import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {changeFilters} from "../../actions/changeFiltersActions";
import {performSearch} from "../../actions/searchActions";
import {fetchSettings} from "../../actions/settingsActions";

import MakerModelsTabs from "../MakerModelsTabs";

class SearchContainer extends React.PureComponent {

  static navigationOptions = {
      title: "reCar.io",
      headerBackTitle: "Модели"
  }

  componentDidMount() {
      this.props.fetchSettings();
  }

  render() {
      const {navigation, settings, carModels, isLoading, filters, onChange, onSelectChange, onSubmit} = this.props;
      return (
          <MakerModelsTabs settings={settings}
              carModels={carModels}
              isLoading={isLoading}
              filters={filters}
              onChange={onChange}
              onSelectChange={onSelectChange}
              onSubmit={onSubmit}
              nav={navigation}
          />

      );
  }
}

function mapStateToProps(state) {
    return {
        settings: state.settings,
        carModels: state.search.cars,
        isLoading: state.search.isLoading,
        filters: state.search.filters
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (fType, fValue) => dispatch(changeFilters(fType, fValue)),
        onSelectChange: (fType, fValue) => dispatch(changeFilters(fType, fValue)),
        onSubmit: () => dispatch(performSearch()),
        fetchSettings: () => dispatch(fetchSettings())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);

SearchContainer.propTypes = {
    navigation: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    carModels: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fetchSettings: PropTypes.func.isRequired
};
