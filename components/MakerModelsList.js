import React from "react";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { Dimensions } from "react-native";
import Car from "./Car";

export default class MakerModelsList extends React.PureComponent {

    render() {
        const {maker, modelImages, nav, models} = this.props;
        const {width} = Dimensions.get("window");
        const dataProvider = new DataProvider((r1, r2) => r1.key !== r2.key);
        const rowRenderer = (type, data) => <Car car={data} maker={maker} modelImages={modelImages} nav={nav}/>;
        const layoutProvider = new LayoutProvider(
            index => 0,
            (type, dim) => {
                dim.width = width;
                dim.height = 470;
            }
        );
        return <RecyclerListView layoutProvider={layoutProvider}
            dataProvider={dataProvider.cloneWithRows(models)}
            rowRenderer={rowRenderer} />;
    }
}
