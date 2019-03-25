import React from "react";
import PropTypes from "prop-types";
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
        const {fAds, fofAds, isLoading, rowRenderer, dataProvider, layoutProvider, token, showModal, hideModal, onSignIn, onRequest, sessionModalVisible} = this.props;

        if (!token) {
            return(
                <View style={{padding: 16}}>
                    <Text>Для того, чтобы увидеть список друзей, нужно войти в систему</Text>
                    <Button onPress={showModal}><Text>Войти</Text></Button>
                    <SessionsModal sessionModalVisible={sessionModalVisible} onSignIn={onSignIn} onRequest={onRequest} showModal={showModal} hideModal={hideModal}/>
                </View>
            );
        }

        if (isLoading) { return <Spinner />; }
        if (fAds.length === 0) { return <Text>У вас нет друзей</Text>; }
        if (fofAds.length === 0) { return <Text>У вас нет друзей</Text>; }

        return(
            <View style={{flex:1, width: "100%", height: 520}}>
                <Tabs locked renderTabBar={()=> <ScrollableTab />}>
                    <Tab heading="Друзья">
                        <AdsListScreen dataProvider={dataProvider}
                            rowRenderer={rowRenderer}
                            layoutProvider={layoutProvider}
                            ads={fAds}
                            title="Объявления ваших друзей"
                        />
                    </Tab>
                    <Tab heading="Друзья друзей">
                        <AdsListScreen dataProvider={dataProvider}
                            rowRenderer={rowRenderer}
                            layoutProvider={layoutProvider}
                            ads={fofAds}
                            title="Объявления друзей ваших друзей"
                        />
                    </Tab>
                </Tabs>
            </View>
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
    sessionModalVisible: PropTypes.bool.isRequired
};
