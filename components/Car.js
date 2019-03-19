import React from "react";
import PropTypes from "prop-types";
import {Image, TouchableHighlight} from "react-native";
import {Card, CardItem, Text, Grid, Col} from "native-base";

export default class Car extends React.PureComponent {

    render() {
        const {modelImages, nav, maker} = this.props;
        const {model, model_id, min_price, max_price, min_year, max_year, ads_count} = this.props.car;
        const navigationParams = {routeName: "Model", params: {modelId: model_id, maker: maker, model: model} };
        const onPress = () => nav.navigate(navigationParams);

        return (
            <Card>
                <CardItem style={{height: 50}} header bordered button onPress={onPress}>
                    <Text>{maker} - {model} ({ads_count})</Text>
                </CardItem>
                <CardItem style={{height: 300}} cardBody>
                    <TouchableHighlight style={{flex: 1}} onPress={onPress}><Image style={{flex: 1}} source={{uri: modelImages[model_id]}} /></TouchableHighlight>
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

Car.propTypes = {
    modelImages: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    maker: PropTypes.string.isRequired,
    car: PropTypes.shape({
        model: PropTypes.string.isRequired,
        model_id: PropTypes.number.isRequired,
        min_price: PropTypes.number.isRequired,
        max_price: PropTypes.number.isRequired,
        min_year: PropTypes.number.isRequired,
        max_year: PropTypes.number.isRequired,
        ads_count: PropTypes.number.isRequired
    }).isRequired
};