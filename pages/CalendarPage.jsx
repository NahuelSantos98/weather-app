import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import { Screen } from "../components/Screen";
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "../utils/debounce";
import { WeatherContext } from "../context/dataContext";
import { CardExample } from "../components/CardExample";

export function CalendarPage() {
    const { searchLoacation } = useContext(WeatherContext);
    const [city, setCity] = useState("");
    const debouncedValue = useDebounce(city);
    const { state } = useContext(WeatherContext);

    useEffect(() => {
        if (city.length > 0) {
            searchLoacation(debouncedValue);
        }
    }, [debouncedValue]);


    return (
        <Screen>
            <Text className="text-white">
                Search any city to see the weather now
            </Text>

            <TextInput
                placeholder="City"
                onChangeText={(text) => setCity(text)}
                className="bg-white w-11/12 h-12 text-white rounded-full px-4 mt-4"
                style={{ color: 'black' }}
            />

            <View className="flex-1">
                {city.length === 0 ? (
                    null
                ) : !state.searchedWeather ? (
                    <ActivityIndicator color={"white"} size={"large"} />
                ) : (
                    <FlatList
                        data={state.searchedWeather}
                        keyExtractor={(item, index) => `${item.dt}-${index}`}
                        renderItem={({ item }) => <CardExample weatherData={item} showForecast={false} />}
                        contentContainerStyle={{ gap: 15 }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </Screen>
    );
}