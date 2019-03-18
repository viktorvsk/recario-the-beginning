import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { NavigationEvents } from "react-navigation";
import FiltersBar from "../FiltersBar";

import { Container, Content } from "native-base";


import {changeFilters} from "../../actions/changeFiltersActions";
import {performSearch} from "../../actions/searchActions";
import {fetchSettings} from "../../actions/settingsActions";

class FiltersContainer extends React.PureComponent {
  static navigationOptions = {
    title: "reCar.io",
    headerBackTitle: "Фильтр"
  }

    componentDidMount() {
        this.props.fetchSettings();
    }

    render() {
        const {navigation, settings, cars, isLoading, filters, onChange, onSelectChange, onSubmit} = this.props;
        return (
            <Container padder>
                <Content>
                    <FiltersBar settings={settings}
                        cars={cars}
                        isLoading={isLoading}
                        filters={filters}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        onSubmit={onSubmit}
                        nav={navigation}
                    />
                </Content>
            </Container>

        );
    }
}

FiltersContainer.propTypes = {
    settings: PropTypes.object.isRequired,
    cars: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        settings: state.settings,
        cars: state.search.cars,
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

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
