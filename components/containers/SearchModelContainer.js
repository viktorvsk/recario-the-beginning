import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {InputGroup, Input, Icon, Spinner} from "native-base";

import {loadSuggestions, clearCurrentYear} from "../../actions/autocompleteActions";

import SuggestionsModelsList from "../SuggestionsModelsList";

class SearchModelContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io", headerBackTitle: null
  }

  render () {
      const {onChange, suggestions, navigation, isLoading, clearCurrentYear} = this.props;
      const onPress = (s) => {
          clearCurrentYear();
          navigation.navigate({routeName: "Model", params: {modelId: s.id, maker: s.maker, model: s.model} });
      };

      return(
          <React.Fragment>
              <InputGroup>
                  <Icon name="ios-search" />
                  <Input placeholder="Введите название марки или модели..." onChange={onChange} />
              </InputGroup>
              {isLoading ? <Spinner/> : <SuggestionsModelsList onPress={onPress} suggestions={suggestions} />}
          </React.Fragment>
      );
  }
}

function mapStateToProps(state) {
    return {
        suggestions: state.autocomplete.suggestions,
        isLoading: state.autocomplete.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (event) => { dispatch(loadSuggestions(event.nativeEvent.text)); },
        clearCurrentYear: () => dispatch(clearCurrentYear())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModelContainer);

SearchModelContainer.propTypes = {
    onChange: PropTypes.func.isRequired,
    clearCurrentYear: PropTypes.func.isRequired,
    suggestions: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};