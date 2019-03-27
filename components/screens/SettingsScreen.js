import React from "react";
import PropTypes from "prop-types";
import {Text, Picker, Button, Spinner} from "native-base";


export default class SettingsScreen extends React.PureComponent {
    render () {
        const {adsSources, setAdsSource, currentAdsSourceId, onSignOut, token, isSignOutLoading} = this.props;

        return(
            <React.Fragment>
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
                {token && isSignOutLoading && <Spinner />}
                {token && !isSignOutLoading && <Button onPress={onSignOut} style={{marginLeft: 16}} rounded><Text>Выйти из системы</Text></Button>}
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
