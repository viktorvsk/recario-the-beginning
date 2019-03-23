import React from "react";
import PropTypes from "prop-types";
import {Image, TouchableHighlight} from "react-native";
import {Card, CardItem, Text, Col, Grid, Left, Right} from "native-base";

import {mapTitleById} from "../Utils";

export default class AdCar extends React.PureComponent {
    render () {
        const {is_owner, car_gear_type_id, car_fuel_type_id, car_wheels_type_id, region, price, engine_capacity, images} = this.props.ad;

        const {onPress} = this.props;
        const {gear_types, fuel_types, wheels_types} = this.props.filters;
        const gearType = mapTitleById(gear_types, car_gear_type_id);
        const fuelType = mapTitleById(fuel_types, car_fuel_type_id);
        const wheelsType = mapTitleById(wheels_types, car_wheels_type_id);
        const fuelString = engine_capacity ? `${fuelType} (${(engine_capacity / 1000).toFixed(1)} л.)` : fuelType;

        return(
            <Card>
                <CardItem style={{height: 300}} cardBody>
                    <TouchableHighlight onPress={onPress} style={{ height: 300, flex: 1 }}><Image style={{ height: 300, flex: 1 }} source={{uri: images[0]}}/></TouchableHighlight>
                </CardItem>
                <CardItem style={{height: 40}}>
                    <Left><Text style={{color: "#3498db", fontSize: 18}}>$ {price}</Text></Left>
                    {!is_owner && <Right><Text style={{color: "#db9834", fontSize: 18}}>(Посредник)</Text></Right>}
                </CardItem>
                <CardItem style={{height: 36}}>
                    <Grid>
                        <Col><Text style={{fontSize: 12}}>{fuelString}</Text></Col>
                        <Col><Text style={{fontSize: 12}}>{region}</Text></Col>
                    </Grid>
                </CardItem>
                <CardItem style={{height: 36}}>
                    <Grid>
                        <Col><Text style={{fontSize: 12}}>{gearType}</Text></Col>
                        <Col><Text style={{fontSize: 12}}>{wheelsType}</Text></Col>
                    </Grid>
                </CardItem>
            </Card>
        );
    }
}

AdCar.propTypes = {
    onPress: PropTypes.func.isRequired,
    filters: PropTypes.shape({
        gear_types: PropTypes.array.isRequired,
        fuel_types: PropTypes.array.isRequired,
        wheels_types: PropTypes.array.isRequired,
        carcass_types: PropTypes.array.isRequired
    }),
    ad: PropTypes.shape({
        is_owner: PropTypes.bool,
        car_gear_type_id: PropTypes.number,
        car_fuel_type_id: PropTypes.number,
        car_wheels_type_id: PropTypes.number,
        region: PropTypes.string,
        price: PropTypes.number.isRequired,
        engine_capacity: PropTypes.number,
        images: PropTypes.array.isRequired
    })
};