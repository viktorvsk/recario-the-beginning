import React from "react";
import PropTypes from "prop-types";
import {List, ListItem, Left, Right, Text, Icon} from "native-base";

export default class SuggestionsModelsList extends React.PureComponent {
    render () {
        const {onPress, suggestions} = this.props;

        return(
            <List>
                {suggestions.map(s => {
                    return(
                        <ListItem key={s.id} onPress={() => onPress(s)}>
                            <Left><Text>{s.maker} {s.model}</Text></Left>
                            <Right><Icon name="arrow-forward" /></Right>
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

SuggestionsModelsList.propTypes = {
    onPress: PropTypes.func.isRequired,
    suggestions: PropTypes.array.isRequired
};
