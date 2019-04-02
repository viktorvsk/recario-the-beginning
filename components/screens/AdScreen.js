import React from "react";
import PropTypes from "prop-types";
import {RefreshControl, Linking} from "react-native";
import {Container, Content, Text, Title, H1, List, ListItem, Left, Right, Button, Body, Tabs, Tab, ScrollableTab} from "native-base";
import Gallery from "react-native-image-gallery";

import {mapTitleById} from "../../Utils";

export default class AdScreen extends React.PureComponent {

    render () {
        const {id, friends, other_ads, car_gear_type_id, car_fuel_type_id, car_wheels_type_id, car_carcass_type_id, url, description, title, region, color, year, price, race, engine_capacity, images, versions} = this.props.ad;
        const {gear_types, fuel_types, wheels_types, carcass_types} = this.props.filters;
        const {loadAd, askFriend} = this.props;
        const gearType = mapTitleById(gear_types, car_gear_type_id);
        const fuelType = mapTitleById(fuel_types, car_fuel_type_id);
        const wheelsType = mapTitleById(wheels_types, car_wheels_type_id);
        const carcassType = mapTitleById(carcass_types, car_carcass_type_id);
        const fuelString = engine_capacity ? `${fuelType} (${(engine_capacity / 1000).toFixed(1)} л.)` : fuelType;
        const imagesURLs = images.map(image => { return {source: {uri: image}}; });
        const onRefresh = () => {
            loadAd(id);
        };
        const descriptionTab = <React.Fragment>
            <H1 style={{textAlign: "center"}}>{title} {year}</H1>
            <Title style={{color: "#3498db", fontSize: 18, padding: 10}}>${price}</Title>

            {imagesURLs.length > 0 && <Gallery
                style={{ flex: 1, backgroundColor: "#fff", padding: 0, margin: 0, height: 300 }}
                images={imagesURLs}
            />}

            <List>
                {gearType && <ListItem><Left><Text>Коробка</Text></Left><Right style={{minWidth: 100}}><Text>{gearType}</Text></Right></ListItem>}
                {fuelString && <ListItem><Left><Text>Топливо</Text></Left><Right style={{minWidth: 100}}><Text>{fuelString}</Text></Right></ListItem>}
                {wheelsType && <ListItem><Left><Text>Привод</Text></Left><Right style={{minWidth: 100}}><Text>{wheelsType}</Text></Right></ListItem>}
                {carcassType && <ListItem><Left><Text>Кузов</Text></Left><Right style={{minWidth: 100}}><Text>{carcassType}</Text></Right></ListItem>}
                {region && <ListItem><Left><Text>Город</Text></Left><Right style={{minWidth: 100}}><Text>{region}</Text></Right></ListItem>}
                {color && <ListItem><Left><Text>Цвет</Text></Left><Right style={{minWidth: 100}}><Text>{color}</Text></Right></ListItem>}
                {parseInt(race) > 0 && <ListItem><Left><Text>Пробег</Text></Left><Right style={{minWidth: 100}}><Text>{race/1000} тыс. км</Text></Right></ListItem>}
            </List>

            <Text style={{padding: 16}}>{description || "Описание отсутствует"}</Text>
            <Text style={{padding: 16, color: "#3498db"}} onPress={() => Linking.openURL(url)}>Источник</Text>
        </React.Fragment>;
        const onlyDescription = versions.length === 0 &&
                                    (typeof friends !== "object" || friends.length === 0) &&
                                    (typeof other_ads !== "object" || other_ads.length === 0);

        if (onlyDescription) {
            return(
                <Container>
                    <Content refreshControl={<RefreshControl onRefresh={onRefresh}/>}>
                        {descriptionTab}
                    </Content>
                </Container>
            );
        }

        return(
            <Container>
                <Content refreshControl={<RefreshControl onRefresh={onRefresh}/>}>

                    <Tabs renderTabBar={()=> <ScrollableTab />}>
                        <Tab heading="Описание">
                            {descriptionTab}
                        </Tab>
                        {versions.length > 0 && <Tab heading="История цен">
                            <ListItem><Body><Text>${price} (сейчас)</Text></Body></ListItem>
                            {versions.map((v, index) => <ListItem key={index}><Body><Text>${v[1]} ({v[0]})</Text></Body></ListItem>)}
                        </Tab>}
                        {other_ads && other_ads.length > 0 && <Tab heading="Другие объявления продавца">
                            <Text style={{padding: 16}}>У этого продавца еще {other_ads.length} других объявлений</Text>
                        </Tab>}
                        {friends && friends.length > 0 && <Tab heading="Друзья">
                            <Text style={{padding: 16}}>Ваши друзья знают продавца этой машины, узнайте у них подрробности, если машина вам интересна. Мы отправим сообщение вашему другу с вопросом по данному автомобилю.</Text>
                            {friends.map((f) => {
                                return(
                                    <ListItem key={f.id}>
                                        <Button onPress={() => askFriend(id, f.id)} style={{backgroundColor: "#badc58"}}><Text>Спросить</Text></Button>
                                        <Body><Text>{f.name}</Text></Body>
                                    </ListItem>
                                );
                            })}
                        </Tab>}
                    </Tabs>

                </Content>
            </Container>


        );
    }
}

AdScreen.propTypes = {
    filters: PropTypes.object.isRequired,
    askFriend: PropTypes.func.isRequired,
    loadAd: PropTypes.func.isRequired,
    ad: PropTypes.shape({
        id: PropTypes.number.isRequired,
        other_ads: PropTypes.array,
        car_gear_type_id: PropTypes.number,
        car_fuel_type_id: PropTypes.number,
        car_wheels_type_id: PropTypes.number,
        car_carcass_type_id: PropTypes.number,
        url: PropTypes.string.isRequired,
        description: PropTypes.string,
        title: PropTypes.string.isRequired,
        region: PropTypes.string,
        color: PropTypes.string,
        year: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        race: PropTypes.number.isRequired,
        engine_capacity: PropTypes.number,
        images: PropTypes.array.isRequired,
        versions: PropTypes.array.isRequired,
        friends: PropTypes.array
    })
};
