import React from "react";
import {connect} from "react-redux";
import {Text, InputGroup, Input, Icon, Spinner} from "native-base";
import {loadSuggestions} from "../../actions/autocompleteActions";
import SuggestionsModelsList from "../SuggestionsModelsList";


class SearchModelContainer extends React.PureComponent {
  static navigationOptions = {
    title: "reCar.io"
  }

  render () {
    const {onChange, suggestions, value, navigation, isLoading} = this.props;
    const onPress = (s) => navigation.navigate({routeName: "Model", params: {modelId: s.id, maker: s.maker, model: s.model} })

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
      value: state.autocomplete.value,
      isLoading: state.autocomplete.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (event) => { dispatch(loadSuggestions(event.nativeEvent.text)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModelContainer);
