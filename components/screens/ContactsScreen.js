import React from "react";
import PropTypes from "prop-types";
import {Text, Spinner, Tab, Tabs, ScrollableTab, View} from "native-base";
import {DataProvider, LayoutProvider} from "recyclerlistview";

import AdsListScreen from "./AdsListScreen";

export default class ContactsScreen extends React.PureComponent {
    componentWillMount () {
        const {postUpdatedContacts, getContacts} = this.props;
        postUpdatedContacts();
        getContacts();
    }
    render () {
        const {fAds, fofAds, isLoading, rowRenderer, dataProvider, layoutProvider} = this.props;
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
    rowRenderer: PropTypes.func.isRequired
};
