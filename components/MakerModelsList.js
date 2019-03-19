import React from "react";
import PropTypes from "prop-types";
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";
import {Dimensions} from "react-native";

import Car from "./Car";

export default class MakerModelsList extends React.Component {

    render() {
        const {maker, modelImages, nav, models} = this.props;
        const {width} = Dimensions.get("window");
        const dataProvider = new DataProvider((r1, r2) => r1.key !== r2.key);
        const rowRenderer = (type, data) => <Car car={data} maker={maker} modelImages={modelImages} nav={nav}/>;
        const layoutProvider = new LayoutProvider(
            () => 0,
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

MakerModelsList.propTypes = {
    maker: PropTypes.string.isRequired,
    modelImages: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    models: PropTypes.array.isRequired
};
