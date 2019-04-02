import React from "react";
import {Linking} from "react-native";
import PropTypes from "prop-types";
import {Text, Picker, Button, Spinner, Container, Content, View, Grid, Col} from "native-base";


export default class SettingsScreen extends React.PureComponent {
    render () {
        const {adsSources, setAdsSource, currentAdsSourceId, onSignOut, token, isSignOutLoading} = this.props;
        const onPrivacyPress = () => Linking.openURL("http://recar.io/privacy.html");

        return(
            <Container style={{flex: 1}}>
                <Content padder>
                    {token && isSignOutLoading && <Spinner />}
                    <Grid>
                        <Col><Text style={{fontSize: 36}}>Источник</Text></Col>
                        <Col>
                            <Picker mode="dropdown"
                                iosHeader="Выберите источник"
                                headerBackButtonText="Назад"
                                placeholder="Источник объявлений"
                                selectedValue={currentAdsSourceId}
                                onValueChange={setAdsSource}
                            >
                                {adsSources.map(source => <Picker.Item value={source.id} key={source.id} label={source.title}/>)}
                            </Picker>
                        </Col>
                    </Grid>
                </Content>
                <Text style={{color: "#3498db", marginLeft: 16, marginBottom: 20}} onPress={onPrivacyPress}>Политика конфиденциальности</Text>
                {token && !isSignOutLoading &&
                    <View style={{marginBottom: 20, justifyContent: "center", flexDirection: "row"}}>
                        <Button onPress={onSignOut}><Text>Выйти из системы</Text></Button>
                    </View>
                }
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
