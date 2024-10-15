import { Text, View, StyleSheet, Image } from "react-native"
import { formatWeatherDate } from "../utils/formatDate";
import { DisplayInfo } from "./DisplayInfo";
import { SunriseIcon, SunsetIcon } from "./Icons";
import { formatTimeDate } from "../utils/formatTimeDate";


export function CardDetail({ weatherData }) {

    if (!weatherData) {
        return <Text className="text-white">Cargando...</Text>;
    }

    const {main, weather, wind, name, sys, dt, clouds } = weatherData;
    const { country, sunrise, sunset } = sys
    const { temp, feels_like, humidity, sea_level, temp_max, temp_min } = main;
    const { speed } = wind;
    const speedKmH = (speed * 3.6).toFixed(1);
    const weatherTitle = weather[0].main
    const weatherDescription = weather[0].description
    const imgurl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const tempCelsius = (temp - 273.15).toFixed(1);
    const minCelsius = (temp_min - 273.15).toFixed(1)
    const maxCelsius = (temp_max - 273.15).toFixed(1)
    const feelsLikeCelsius = (feels_like - 273.15).toFixed(1);
    const date = formatWeatherDate(dt)
    const { all: cloudsPercentage } = clouds
    const sunriseDate = new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Obtener solo la hora
    const sunsetDate = new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Obtener solo la hora
    const currentHour = formatTimeDate(dt)


    return (
        <View className="py-3 rounded-xl border border-gray-300 px-7 bg-blue-500" style={styles.shadow}>
            <Text style={styles.country}>{country}</Text>
            <View>
                <Text className="text-white text-center font-semibold text-xl">{name}</Text>
                <Text className="text-white text-center font-semibold ">{date}</Text>
                <Text className="text-white text-center font-semibold mt-1">{currentHour}</Text>
            </View>
            <View className="flex-row mt-5 items-center gap-4 w-full justify-center">
                <Image source={{ uri: imgurl }} className="w-20 h-20" />
                <View>
                    <Text className=" font-bold text-2xl text-white" style={styles.lineHeightChange}>{tempCelsius}°C</Text>
                    <Text className="text-left text-lg text-white" style={styles.lineHeightChange}>{weatherTitle}</Text>
                </View>
            </View>

            <View className="flex-row justify-between">
                <View>
                <Text className="text-white font-bold text-xl">Min: {minCelsius}°C</Text>
                </View>

                <View>
                    <Text className="text-white font-bold text-xl">Max: {maxCelsius}°C</Text>
                </View>
            </View>

            <DisplayInfo humidity={humidity} feelsLikeCelsius={feelsLikeCelsius} wind={speedKmH} clouds={cloudsPercentage} />

            <View className="items-center mt-5">
                <Text className="text-white text-lg">Description: {weatherDescription}</Text>
                <View className="flex-row justify-between w-full mt-5" >
                    <View className="items-center gap-2">
                        <Text className="text-white underline font-bold">Sunrise: </Text>
                        <Text className="text-white">{sunriseDate}</Text>
                        <SunriseIcon />
                    </View>
                    <View className="items-center gap-2">
                        <Text className="text-white underline font-bold">Sunset:</Text>
                        <Text className="text-white">{sunsetDate}</Text>
                        <SunsetIcon />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    country: {
        position: 'absolute',
        right: 20,
        top: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    lineHeightChange: {
        lineHeight: 0
    },
})