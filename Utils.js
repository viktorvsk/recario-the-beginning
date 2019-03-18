export function mapTitleById(flt, id) {
    return (flt.filter(f => f.id.includes(id))[0] || {}).title;
}

export function getSuggestionValue (suggestion) { return `${suggestion.maker} ${suggestion.model}`; }

export function filterAds(ads, filters) {
    function normalize(str) {
        if (str === "") { return []; }
        return str.filter(v => parseInt(v) > 0);
    }

    return ads.filter(ad => {
        const currentGearTypes = normalize(filters.gearType);
        const currentFuelTypes = normalize(filters.fuelType);
        const currentWheelsTypes = normalize(filters.wheelsType);

        const matchesGearType = currentGearTypes.length === 0 || currentGearTypes.includes(ad.car_gear_type_id);
        const matchesFuelType = currentFuelTypes.length === 0 || currentFuelTypes.includes(ad.car_fuel_type_id);
        const matchesWheelsType = currentWheelsTypes.length === 0 || currentWheelsTypes.includes(ad.car_wheels_type_id);
        const matchesCity = typeof filters.city === "undefined" || filters.city.trim() === "" || ad.region === filters.city;

        return matchesGearType && matchesFuelType && matchesWheelsType && matchesCity;
    });
}