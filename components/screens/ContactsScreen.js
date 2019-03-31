import React from "react";
import PropTypes from "prop-types";
import {ScrollView, RefreshControl} from "react-native";
import {Text, Spinner, Tab, Tabs, ScrollableTab, View, Button} from "native-base";
import {DataProvider, LayoutProvider} from "recyclerlistview";
import SessionsModal from "../modals/SessionsModal";

import AdsListScreen from "./AdsListScreen";

export default class ContactsScreen extends React.PureComponent {
    componentDidMount() {
        const {postUpdatedContacts, getContacts, nav} = this.props;

        this._sub = nav.addListener("didFocus", () => {
            postUpdatedContacts();
            getContacts();
        });
    }

    componentWillUnmount() {
        if (this._sub) { this._sub.remove(); }
    }

    render () {
        const {sessionError, permissionsGiven, fAds, fofAds, isLoading, rowRenderer, dataProvider, layoutProvider, token, showModal, hideModal, onSignIn, onRequest, sessionModalVisible} = this.props;

        const onRefresh = () => {
            const {postUpdatedContacts, getContacts} = this.props;

            postUpdatedContacts();
            getContacts();
        };


        if (!token) {
            return(
                <View style={{padding: 16}}>
                    <Text>Для того, чтобы увидеть список друзей, нужно войти в систему и дать приложению доступ к списку своих контактов.</Text>
                    <Button onPress={showModal} style={{marginTop: 16}} rounded><Text>Войти</Text></Button>
                    <SessionsModal sessionModalVisible={sessionModalVisible} onSignIn={onSignIn} onRequest={onRequest} showModal={showModal} hideModal={hideModal} error={sessionError}/>
                </View>
            );
        }

        if (isLoading) { return <Spinner />; }

        if (!permissionsGiven) { return <Text style={{padding: 16}}>Приложению нужен доступ к вашему списку контактов для того, чтобы вы могли найти друзей и друзей их друзей, кто продает машину.</Text>; }

        if (fAds.length === 0 && fofAds.length === 0) {
            return(
                <ScrollView style={{padding: 16}} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>}>
                    <Text>Ваши друзья не разместили объявлений о продаже машины, либо синхронизация контактов еще не завершена. Она может занять некоторое время, в зависимости от количества контактов и загруженности системы. Пожалуйста, попробуйте позже.</Text>
                </ScrollView>
            );

        }

        return(
            <Tabs renderTabBar={()=> <ScrollableTab />} style={{flex: 1}}>
                <Tab heading="Друзья">
                    {fAds.length === 0 && <Text style={{padding: 16}}>Объявления друзей не найдены</Text>}
                    {fAds.length > 0 && <AdsListScreen dataProvider={dataProvider}
                        rowRenderer={rowRenderer}
                        layoutProvider={layoutProvider}
                        ads={fAds}
                    />}
                </Tab>
                <Tab heading="Друзья друзей">
                    {fofAds.length === 0 && <Text style={{padding: 16}}>Объявления друзей ваших друзей не найдены</Text>}
                    {fofAds.length > 0 && <AdsListScreen dataProvider={dataProvider}
                        rowRenderer={rowRenderer}
                        layoutProvider={layoutProvider}
                        ads={fofAds}
                    />}
                </Tab>
            </Tabs>
        );
    }
}

ContactsScreen.propTypes = {
    postUpdatedContacts: PropTypes.func.isRequired,
    getContacts: PropTypes.func.isRequired,
    fAds: PropTypes.array.isRequired,
    fofAds: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    layoutProvider: PropTypes.instanceOf(LayoutProvider).isRequired,
    dataProvider: PropTypes.instanceOf(DataProvider).isRequired,
    rowRenderer: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    onSignIn: PropTypes.func.isRequired,
    onRequest: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    token: PropTypes.string,
    sessionModalVisible: PropTypes.bool.isRequired,
    permissionsGiven: PropTypes.bool.isRequired,
    sessionError: PropTypes.object.isRequired
};
