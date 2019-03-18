import React from "react";
import {Image} from "react-native";
import {Button, Container, Content, Spinner, Text, Title, Picker, Item, View, Header} from "native-base";



import {filterAds} from "../../Utils";


export default class ModelScreen extends React.PureComponent {

    render () {
        const {nav, currentModelId, title, currentYear, adsLoading, modelLoading, years, ads, onChange, onFilter, currentAdsFilters, filters, preview, settingsFilters} = this.props;
        const currentYearRow = years.filter(row => row.year === currentYear)[0];
        const onPress = () => nav.push("AdsList");

        const adsToShow = filterAds(ads, currentAdsFilters);

        if (modelLoading) { return <Spinner />; }
        return(

            <Container padder>

                {title && <Content>
                    <Title><Text>{title}</Text></Title>

                    <Picker
                        mode="dropdown"
                        iosHeader="Выберите год"
                        placeholder="Выберите год..."
                        selectedValue={currentYear}
                        onValueChange={(year) => { onChange(currentModelId, year);}}
                    >
                        {years.map(row => <Picker.Item value={row.year} key={row.year} label={`${row.year} ($${row.min_price} - $${row.max_price})`}/>)}
                    </Picker>


                    {preview && <Image style={{ height: 300, flex: 1 }} source={{uri: preview}} />}

                    {years.length > 0 && currentYear &&
                        <Content padder>
                            <Text>Цены начинаются от ${currentYearRow.min_price} и самый дорогой вариант - ${currentYearRow.max_price}.</Text>
                            <Text>Средняя цена - ${Math.round(currentYearRow.average_price)} среди {currentYearRow.ads_count} предложений.</Text>
                        </Content>
                    }

                    {ads.length > 0 &&
                        <React.Fragment>
                            <Picker
                                mode="dropdown"
                                iosHeader="Коробка"
                                placeholder="Коробка"
                                selectedValue={currentAdsFilters["gearType"]}
                                onValueChange={value => onFilter("gearType", value)}
                            >
                                {settingsFilters["gear_types"].map(t => <Picker.Item value={t.id} key={t.id} label={t.title}/>)}
                            </Picker>
                            <Picker
                                mode="dropdown"
                                iosHeader="Топливо"
                                placeholder="Топливо"
                                selectedValue={currentAdsFilters["fuelType"]}
                                onValueChange={value => onFilter("fuelType", value)}
                            >
                                {settingsFilters["fuel_types"].map(t => <Picker.Item value={t.id} key={t.id} label={t.title}/>)}
                            </Picker>
                            <Picker
                                mode="dropdown"
                                iosHeader="Привод"
                                placeholder="Привод"
                                selectedValue={currentAdsFilters["wheelsType"]}
                                onValueChange={value => onFilter("wheelsType", value)}
                            >
                                {settingsFilters["wheels_types"].map(t => <Picker.Item value={t.id} key={t.id} label={t.title}/>)}
                            </Picker>
                            <Picker
                                mode="dropdown"
                                iosHeader="Город"
                                placeholder="Город"
                                selectedValue={currentAdsFilters["city"]}
                                onValueChange={value => onFilter("city", value)}
                            >
                                {settingsFilters["wheels_types"].map(t => <Picker.Item value={t.id} key={t.id} label={t.title}/>)}
                            </Picker>
                        </React.Fragment>
                    }

                    {ads.length > 0 &&
                    <View style={{margin: 20, justifyContent: "center", flexDirection: "row"}}>
                        <Button rounded block primary onPress={onPress} style={{width: "90%"}}>
                            <Text>Показать {adsToShow.length} объявлений</Text>
                        </Button>
                    </View>
                    }


                </Content>}
            </Container>

        );
    }
}