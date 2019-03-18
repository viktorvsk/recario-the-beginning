import React from "react";
import {Image} from "react-native";
import {Card, CardItem, Text, Grid, Col} from "native-base";
import {NavigationActions} from "react-navigation";

export default class Car extends React.PureComponent {

    render() {
        const {modelImages, nav, maker} = this.props;
        const {model, model_id, min_price, max_price, min_year, max_year, ads_count} = this.props.car;
        const navigationParams = {routeName: "Model", params: {modelId: model_id, maker: maker, model: model} };
        const onPress = () => nav.dispatch(NavigationActions.navigate(navigationParams));

        return (
            <Card>
                <CardItem style={{height: 50}} header bordered button onPress={onPress}>
                    <Text>{maker} - {model} ({ads_count})</Text>
                </CardItem>
                <CardItem style={{height: 300}} cardBody>
                    <Image style={{ height: 300, flex: 1 }} source={{uri: modelImages[model_id]}} />
                </CardItem>
                <CardItem style={{height: 50}} bordered>
                    <Grid>
                        <Col>
                            <Text style={{fontSize: 12}}>от ${min_price} до ${max_price}</Text>
                        </Col>

                        <Col>
                            <Text style={{fontSize: 12}}>от {min_year} да {max_year} года</Text>
                        </Col>
                    </Grid>
                </CardItem>
            </Card>
        );
    }
}
