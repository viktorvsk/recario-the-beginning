import React from "react";
import PropTypes from "prop-types";
import {Text, Picker, Button} from "native-base";


export default class SettingsScreen extends React.PureComponent {
    render () {
        const {adsSources, setAdsSource, currentAdsSourceId, onSignOut, token} = this.props;

        return(
            <React.Fragment>
                <Text>{token}</Text>
                <Text style={{paddingLeft: 16}}>Выберите источник объявлений</Text>
                <Picker mode="dropdown"
                    iosHeader="Выберите источник"
                    headerBackButtonText="Назад"
                    placeholder="Источник объявлений"
                    selectedValue={currentAdsSourceId}
                    onValueChange={setAdsSource}
                >
                    {adsSources.map(source => <Picker.Item value={source.id} key={source.id} label={source.title}/>)}
                </Picker>
                {token && <Button onPress={onSignOut}><Text>Выйти из системы</Text></Button>}
            </React.Fragment>
        );
    }
}

SettingsScreen.propTypes = {
    adsSources: PropTypes.array.isRequired,
    setAdsSource: PropTypes.func.isRequired,
    currentAdsSourceId: PropTypes.number.isRequired,
    onSignOut: PropTypes.func.isRequired,
    token: PropTypes.string
};
