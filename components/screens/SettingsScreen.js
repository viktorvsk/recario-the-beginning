import React from "react";
import {Linking} from "react-native";
import PropTypes from "prop-types";
import {Text, Picker, Button, Spinner, Container, Content, List, ListItem} from "native-base";


export default class SettingsScreen extends React.PureComponent {
    render () {
        const {adsSources, setAdsSource, currentAdsSourceId, onSignOut, token, isSignOutLoading} = this.props;

        return(
            <Container>
                <Content>
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
                    {token && !isSignOutLoading && <Button onPress={onSignOut} style={{marginLeft: 16, marginTop: 24, marginBottom: 24}} rounded><Text>Выйти из системы</Text></Button>}
                    <Text style={{padding: 16, color: "#3498db"}} onPress={() => Linking.openURL("https://recar.io/privacy.html")}>Политика конфиденциальности</Text>
                </Content>
            </Container>
        );
    }
}

SettingsScreen.propTypes = {
    adsSources: PropTypes.array.isRequired,
    setAdsSource: PropTypes.func.isRequired,
    currentAdsSourceId: PropTypes.number.isRequired,
    onSignOut: PropTypes.func.isRequired,
    token: PropTypes.string,
    isSignOutLoading: PropTypes.bool.isRequired
};
