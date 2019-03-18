import React from "react";
import { Dimensions, Image } from "react-native";
import Gallery from "react-native-image-gallery";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import {Container, Content, Spinner, Text, Title, Picker, Form, Item, View, H1, H3, List, ListItem, Left, Right, Header} from "native-base";

import AdCar from "../AdCar";

import {mapTitleById} from "../../Utils";


export default class AdScreen extends React.PureComponent {

    render () {
        const {ad, isLoading} = this.props;

        const {other_ads, car_gear_type_id, car_fuel_type_id, car_wheels_type_id, car_carcass_type_id, url, description, title, region, color, year, price, race, engine_capacity, images, versions} = this.props.ad;

        const {filters} = this.props;
        const {gear_types, fuel_types, wheels_types, carcass_types} = filters;
        const gearType = mapTitleById(gear_types, car_gear_type_id);
        const fuelType = mapTitleById(fuel_types, car_fuel_type_id);
        const wheelsType = mapTitleById(wheels_types, car_wheels_type_id);
        const carcassType = mapTitleById(carcass_types, car_carcass_type_id);
        const imageItems = images.map((image) => { return { original: image, thumbnail: image }; });
        const fuelString = engine_capacity ? `${fuelType} (${(engine_capacity / 1000).toFixed(1)} л.)` : fuelType;
        const imagesURLs = images.map(image => { return {source: {uri: image}}; });

        if (isLoading) { return <Spinner />; }
        return(

            <Container>
                <Content>
                    <Title>{title} {year}</Title>
                    <Title style={{color: "#3498db", fontSize: 18, padding: 10}}>${price}</Title>

                    <Gallery
                        style={{ flex: 1, backgroundColor: "#fff", padding: 0, margin: 0, height: 300 }}
                        images={imagesURLs}
                    />

                    <List>
                        {gearType && <ListItem><Left><Text>Коробка</Text></Left><Right style={{minWidth: 100}}><Text>{gearType}</Text></Right></ListItem>}
                        {fuelString && <ListItem><Left><Text>Топливо</Text></Left><Right style={{minWidth: 100}}><Text>{fuelString}</Text></Right></ListItem>}
                        {wheelsType && <ListItem><Left><Text>Привод</Text></Left><Right style={{minWidth: 100}}><Text>{wheelsType}</Text></Right></ListItem>}
                        {carcassType && <ListItem><Left><Text>Кузов</Text></Left><Right style={{minWidth: 100}}><Text>{carcassType}</Text></Right></ListItem>}
                        {region && <ListItem><Left><Text>Город</Text></Left><Right style={{minWidth: 100}}><Text>{region}</Text></Right></ListItem>}
                        {color && <ListItem><Left><Text>Цвет</Text></Left><Right style={{minWidth: 100}}><Text>{color}</Text></Right></ListItem>}
                        {race && <ListItem><Left><Text>Пробег</Text></Left><Right style={{minWidth: 100}}><Text>{race/1000} тыс. км.</Text></Right></ListItem>}
                    </List>



                    <Text style={{padding: 16}}>{description || "Описание отсутствует"}</Text>
                    <Text style={{padding: 16}}>Источник: {url}</Text>
                </Content>
            </Container>


        );
    }
}