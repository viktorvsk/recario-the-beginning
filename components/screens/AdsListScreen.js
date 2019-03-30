import React from "react";
import PropTypes from "prop-types";
import {View, Text, H1} from "native-base";
import {RecyclerListView} from "recyclerlistview";
import {DataProvider, LayoutProvider} from "recyclerlistview";

export default class AdsListScreen extends React.PureComponent {
    render () {
        const {ads,layoutProvider, dataProvider, rowRenderer, title} = this.props;

        if (ads.length === 0) { return <Text>Объявления не найдены. Пожалуйста, уточните поиск.</Text>; }

        return(
            <View style={{flex:1, width: "100%", height: 350}}>
                {title && <H1 style={{textAlign: "center"}}>{title}</H1>}
                <RecyclerListView layoutProvider={layoutProvider}
                    dataProvider={dataProvider.cloneWithRows(ads)}
                    rowRenderer={rowRenderer} />
            </View>
        );
    }
}

AdsListScreen.propTypes = {
    ads: PropTypes.array.isRequired,
    layoutProvider: PropTypes.instanceOf(LayoutProvider).isRequired,
    dataProvider: PropTypes.instanceOf(DataProvider).isRequired,
    rowRenderer: PropTypes.func.isRequired,
    title: PropTypes.string
};
