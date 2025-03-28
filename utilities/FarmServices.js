import { HouseholdClient } from "./httpClient";

const Path = {
    farms: 'farms/user-farms/',  // Remove hardcoded id from path
}
const WEATHER_API_KEY = '4af2830a60b55aef9878adbbfcf2eb63'; // Store this in environment variables
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/3.0';
export const getWeatherData = async (
    latitude,
    longitude,
    exclude = '', // e.g., 'minutely,hourly' to exclude specific data
    units = 'metric', // 'metric', 'imperial', or 'standard'
    lang = 'en' // Language code, e.g., 'es' for Spanish
) => {
    try {
        const url = `${WEATHER_BASE_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&lang=${lang}&appid=${WEATHER_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Weather fetch error:', error);
        throw error;
    }
};
export const getFarmsService = (id) => {
    console.log('ID', id);
    console.log('Path', `${Path.farms}?user_id=${id}`);
    // https://major2-production.up.railway.app/api/farms/user_farms/?user_id=2
    return HouseholdClient.get(`farms/user_farms/?user_id=${id}`);
}

export const addFarmService = (data) => {
    return HouseholdClient.post("farms/", data);
}

export const deleteFarmService = (id) => {
    return HouseholdClient.delete(`farms/${id}/`);
}

export const updateFarmService = (id, data) => {
    console.log('data', data);
    console.log('ID', id);

    return HouseholdClient.patch(`farms/${id}/`, data);
}

export const diseasePredictionService = (data) => {
    return HouseholdClient.post("detect-plant-disease/", data);
}