import React from "react";
import PropTypes from "prop-types";
import {Text, Tab, Tabs, ScrollableTab, View, Spinner} from "native-base";

import MakerModelsList from "./MakerModelsList";

export default class MakerModelsTabs extends React.PureComponent {
    render () {
        const {nav, carModels, settings, isLoading} = this.props;
        const models = Object.keys(carModels);

        if (isLoading) { return <Spinner />; }

        if (models.length == 0) { return <Text>Результаты не найдены. Пожалуйста, уточните поиск.</Text>; }

        return(
            <View style={{flex:1, width: "100%", height: 520}}>
                <Tabs locked renderTabBar={()=> <ScrollableTab />}>
                    {models.map((maker) => {
                        return(
                            <Tab heading={`${maker} (${carModels[maker].length})`} key={maker}>
                                <MakerModelsList models={carModels[maker]} key={maker} maker={maker} modelImages={settings.model_images} nav={nav}/>
                            </Tab>
                        );
                    }
                    )}
                </Tabs>
            </View>
        );
    }
}

MakerModelsTabs.propTypes = {
    nav: PropTypes.object.isRequired,
    carModels: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};