import React from "react";
import {Image} from "react-native";
import {Button, Container, Content, Spinner, Text, Title, Picker, Item, View, Header, Form} from "native-base";



import {filterAds} from "../../Utils";


export default class ModelScreen extends React.PureComponent {

    render () {
        const {nav, currentModelId, title, currentYear, adsLoading, modelLoading, years, ads, onChange, onFilter, currentAdsFilters, filters, preview, settingsFilters} = this.props;
        const currentYearRow = years.filter(row => row.year === currentYear)[0];
        const onPress = () => nav.push("AdsList");
        const cities =  ads.filter((value, index, self) => self.map(x => x.region).indexOf(value.region) === index)
            .filter(ad => ad.region && ad.region.trim() !== "")
            .map(ad => { return { id: ad.region, title: ad.region }; });

        const adsToShow = filterAds(ads, currentAdsFilters);

        if (modelLoading) { return <Spinner />; }
        return(

            <Container padder>

                <Content>
                    <Title>{title}</Title>

                    <Picker
                        mode="dropdown"
                        iosHeader="Выберите год"
                        headerBackButtonText="Назад"
                        placeholder="Выберите год..."
                        selectedValue={currentYear}
                        onValueChange={(year) => { onChange(currentModelId, year);}}
                    >
                        {years.map(row => <Picker.Item value={row.year} key={row.year} label={`${row.year} ($${row.min_price} - $${row.max_price})`}/>)}
                    </Picker>


                    <Image style={{ height: 300, flex: 1 }} source={{uri: preview}} />

                    {years.length > 0 && currentYear &&
                        <Content padder>
                            <Text>Цены начинаются от ${currentYearRow.min_price} и самый дорогой вариант - ${currentYearRow.max_price}.</Text>
                            <Text>Средняя цена - ${Math.round(currentYearRow.average_price)} среди {currentYearRow.ads_count} предложений.</Text>
                        </Content>
                    }

                    {ads.length > 0 &&
                        <Form>
                            <Item picker style={{paddingLeft: 15}} >
                                <Text style={{width: "50%"}}>Тип КПП</Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Выберите тип КПП"
                                    headerBackButtonText="Назад"
                                    placeholder="Любая"
                                    selectedValue={currentAdsFilters["gearType"]}
                                    onValueChange={value => onFilter("gearType", value)}
                                >
                                    <Picker.Item value="" label="Любая"/>
                                    {settingsFilters["gear_types"].map(t => <Picker.Item value={t.id} key={t.id} label={t.title}/>)}
                                </Picker>
                            </Item>
                            <Item picker style={{paddingLeft: 15}} >
                                <Text style={{width: "50%"}}>Тип топлива</Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Выберите тип топлива"
                                    headerBackButtonText="Назад"
                                    placeholder="Любое"
                                    selectedValue={currentAdsFilters["fuelType"]}
                                    onValueChange={value => onFilter("fuelType", value)}
                                >
                                    <Picker.Item value="" label="Любое"/>
                                    {settingsFilters["fuel_types"].map(t => <Picker.Item value={t.id} key={t.id} label={t.title}/>)}
                                </Picker>
                            </Item>
                            <Item picker style={{paddingLeft: 15}} >
                                <Text style={{width: "50%"}}>Тип привода</Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Выберите тип привода"
                                    headerBackButtonText="Назад"
                                    placeholder="Любой"
                                    selectedValue={currentAdsFilters["wheelsType"]}
                                    onValueChange={value => onFilter("wheelsType", value)}
                                >
                                    <Picker.Item value="" label="Любой"/>
                                    {settingsFilters["wheels_types"].map(t => <Picker.Item value={t.id} key={t.id} label={t.title}/>)}
                                </Picker>
                            </Item>
                            <Item picker style={{paddingLeft: 15}} >
                                <Text style={{width: "50%"}}>Город</Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Выберите город"
                                    headerBackButtonText="Назад"
                                    placeholder="Любой"
                                    selectedValue={currentAdsFilters["city"]}
                                    onValueChange={value => onFilter("city", value)}
                                >
                                    <Picker.Item value="" label="Любой"/>
                                    {cities.map(t => <Picker.Item value={t.id} key={t.id} label={t.title}/>)}
                                </Picker>
                            </Item>
                            <View style={{margin: 20, justifyContent: "center", flexDirection: "row"}}>
                                <Button rounded block primary onPress={onPress} style={{width: "90%"}}>
                                    <Text>Показать {adsToShow.length} объявлений</Text>
                                </Button>
                            </View>
                        </Form>
                    }
                </Content>
            </Container>

        );
    }
}