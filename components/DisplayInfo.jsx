import { Text, View } from "react-native";
import { CalendarIcon, CloudIcon, HumidityIcon, TemperatureIcon, WindIcon } from "./Icons";

export function DisplayInfo({ humidity, feelsLikeCelsius, wind, clouds }) {

    return (
        <View className="flex-row justify-around gap-4">
            <View className="gap-2">
            <View className="flex-row items-center gap-2">
                    <TemperatureIcon />
                    <View>
                        <Text>Feels Like</Text>
                    <Text className="font-bold">{feelsLikeCelsius}°C</Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-2">
                    <WindIcon />
                    <View>
                        <Text>Wind</Text>
                    <Text className="font-bold">{wind}Km/h</Text>
                    </View>
                </View>

            </View>

            <View className="gap-2">
            <View className="flex-row items-center gap-2">
                    <HumidityIcon />
                    <View>
                        <Text>Humidity</Text>
                    <Text className="font-bold">{humidity}%</Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-2">
                    <CloudIcon />
                    <View>
                        <Text>Nubosity</Text>
                    <Text className="font-bold">{clouds}%</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}