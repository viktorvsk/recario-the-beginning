import React from "react";
import { Button, Text, Form, Item, Label, Picker, Icon } from "native-base";
import { NavigationActions } from "react-navigation";
import { Dimensions, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

export default class FiltersBar extends React.PureComponent {

    render() {
        const {filters, settings, onSubmit, onChange, nav} = this.props;
        const sliderLength = Dimensions.get("window").width - 60;
        const onPriceChange = values => {onChange("q[price_min]", values[0]); onChange("q[price_max]", values[1]);};
        const onYearChange = values => {onChange("q[year_min]", values[0]); onChange("q[year_max]", values[1]);};
        const onRaceChange = values => {onChange("q[race_min]", values[0]); onChange("q[race_max]", values[1]);};
        const onAdsCountChange = values => {onChange("q[ads_count]", values[0]);};

        const onGearChange = value => onChange("q[gear_type_id]", value);
        const onFuelChange = value => onChange("q[fuel_type_id]", value);
        const onWheelsChange = value => onChange("q[wheels_type_id]", value);
        const onCarcassChange = value => onChange("q[carcass_type_id]", value);

        const onSearch = () => {
            nav.push("SearchResults");
            onSubmit();

        };

        const pickerGenerator = option => <Picker.Item value={option.id} key={option.id} label={option.title}/>;

        return (
            <Form>
                <Item style={{ margin: 5, padding: 5 }} >
                    <View style={{flex: 1}}>
                        <View style={{ height: 30}}>
                            <Text style={{position: "absolute"}}>Цена</Text>
                            <Text style={{textAlign: "right"}}>от ${filters["q[price_min]"]} до ${filters["q[price_max]"]}</Text>
                        </View>
                        <View style={{ justifyContent: "center", flexDirection: "row", width: "100%" }}>
                            <MultiSlider
                                values={[filters["q[price_min]"], filters["q[price_max]"]]}
                                sliderLength={sliderLength}
                                onValuesChange={onPriceChange}
                                min={0}
                                max={100000}
                                step={500}
                                allowOverlap
                                snapped
                            />
                        </View>
                    </View>
                </Item>
                <Item style={{ margin: 5, padding: 5 }} >
                    <View style={{flex: 1}}>
                        <View style={{ height: 30}}>
                            <Text style={{position: "absolute"}}>Год</Text>
                            <Text style={{textAlign: "right"}}>от {filters["q[year_min]"]} до {filters["q[year_max]"]} года</Text>
                        </View>
                        <View style={{ justifyContent: "center", flexDirection: "row", width: "100%" }}>
                            <MultiSlider
                                values={[filters["q[year_min]"], filters["q[year_max]"]]}
                                sliderLength={sliderLength}
                                onValuesChange={onYearChange}
                                min={1980}
                                max={2019}
                                step={1}
                                allowOverlap
                                snapped
                            />
                        </View>
                    </View>
                </Item>

                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosHeader="Выберите КПП"
                        placeholder="КПП"
                        selectedValue={filters["q[gear_type_id]"]}
                        onValueChange={onGearChange}
                    >
                        {settings.filters.gear_types.map(option => pickerGenerator(option))}
                    </Picker>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosHeader="Выберите тип топлива"
                        placeholder="Топливо"
                        selectedValue={filters["q[fuel_type_id]"]}
                        onValueChange={onFuelChange}
                    >
                        {settings.filters.fuel_types.map(option => pickerGenerator(option))}
                    </Picker>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosHeader="Выберите привод"
                        placeholder="Привод"
                        selectedValue={filters["q[wheels_type_id]"]}
                        onValueChange={onWheelsChange}
                    >
                        {settings.filters.wheels_types.map(option => pickerGenerator(option))}
                    </Picker>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosHeader="Выберите кузов"
                        placeholder="Кузов"
                        selectedValue={filters["q[carcass_type_id]"]}
                        onValueChange={onCarcassChange}
                    >
                        {settings.filters.carcass_types.map(option => pickerGenerator(option))}
                    </Picker>
                </Item>
                <View style={{margin: 20, justifyContent: "center", flexDirection: "row"}}>
                    <Button rounded block primary onPress={onSearch} style={{width: "50%"}}>
                        <Text>Найти</Text>
                    </Button>
                </View>
            </Form>
        );
    }
}
