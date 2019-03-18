import React from "react";
import { Container, Content, Text, Tab, Tabs, ScrollableTab, View, Spinner } from "native-base";
import MakerModelsList from "./MakerModelsList";

export default class MakerModelsTabs extends React.PureComponent {
    render () {
        const {nav, cars, settings, isLoading} = this.props;
        const models = Object.keys(cars);
        if (isLoading) { return <Spinner />; }
        if (models.length == 0) { return <Text>Результаты не найдены. Пожалуйста, уточните поиск.</Text>; }
        return(
            <View style={{flex:1, width: "100%", height: 520}}>
                <Tabs locked renderTabBar={()=> <ScrollableTab />}>
                    {models.map((maker, i) => {
                        return(
                            <Tab heading={`${maker} (${cars[maker].length})`} key={maker}>
                                <MakerModelsList models={cars[maker]} key={maker} maker={maker} modelImages={settings.model_images} nav={nav}/>
                            </Tab>
                        );
                    }
                    )}
                </Tabs>
            </View>
        );
    }
}