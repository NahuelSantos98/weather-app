import { Image, Text, View } from "react-native";
import { formatWeatherDate } from "../utils/formatDate";
import { StyleSheet } from "react-native";
import { DisplayInfo } from "./DisplayInfo";
import {Link} from 'expo-router'

export function CardExample({ weatherData , showForecast}) {
    if (!weatherData) {
        return <Text className="text-white">Cargando...</Text>; 
    }

    const { main, weather, wind, name, sys, dt, clouds, id} = weatherData; 
    const {country} = sys
    const { temp, feels_like, humidity } = main; 
    const { speed } = wind; 
    const speedKmH = (speed * 3.6).toFixed(1);
    const weatherTitle = weather[0].main 
    const imgurl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; 
    const tempCelsius = (temp - 273.15).toFixed(1); 
    const feelsLikeCelsius = (feels_like - 273.15).toFixed(1);
    const date = formatWeatherDate(dt)
    const {all: cloudsPercentage} = clouds

    return (
        <View className="py-3 rounded-xl border border-gray-300 px-10 bg-blue-500" style={styles.shadow}>
            <Text style={styles.country}>{country}</Text>
            <View>
                <Text className="text-white text-center font-semibold text-xl">{name}</Text>
                <Text className="text-white text-center font-semibold">{date}</Text>
            </View>
            <View className="flex-row items-center pl-8 w-full">
                <View>
                <Image source={{uri: imgurl}} className="w-20 h-20" />
                </View>
                <View>
                    <Text className=" font-bold text-2xl text-white" style={styles.lineHeightChange}>{tempCelsius}°C</Text>
                    <Text className="text-left text-lg text-white" style={styles.lineHeightChange}>{weatherTitle}</Text>
                </View>
            </View>

        <DisplayInfo humidity={humidity} feelsLikeCelsius={feelsLikeCelsius} wind={speedKmH} clouds={cloudsPercentage} />


    {showForecast&& <Link className="mb-3 mt-6 " asChild href={`/${id}`}><Text className="text-white text-center text-gray-300">View Forecast</Text></Link> }

        
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
    lineHeightChange:{
        lineHeight: 0
    },
})
