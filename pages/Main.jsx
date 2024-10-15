import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { WeatherContext } from "../context/dataContext";
import { getDay } from "../utils/getDay";
import { CardDays } from "../components/CardDays";
import { CardExample } from "../components/CardExample";

import { Screen } from "../components/Screen";


export function Main() {
    const [infoDay, setInfoDay] = useState(null);
    const { state, dispatch, getData } = useContext(WeatherContext);

    useEffect(() => {
        if (state.daysAfter) {
            const info = getDay(state.daysAfter);
            setInfoDay(info);
        }
    }, [state.daysAfter]);

    useEffect(() => { 
        const fetchWeatherData = async () => {
            if (state.location && state.location.coords) {
                const { latitude: lat, longitude: lon } = state.location.coords;
                try {
                    const data = await getData(lat, lon);
                    dispatch({ type: "DATA_WEATHER", payload: data });
                } catch (error) {
                    console.error("Error al obtener datos del clima:", error);
                }
            }
        };
        fetchWeatherData();
    }, [state.location]);
    

    return (
        <Screen>
                <CardExample weatherData={state.weatherData} showForecast={true} />
                <View  className="flex-1 w-11/12 py-4" >
                    {
                        !infoDay ?
                        <View>
                            <ActivityIndicator color={"white"} size={"large"} />
                        </View>
                            :
                            <FlatList
                                data={infoDay}
                                keyExtractor={(item) => item.dt.toString()}
                                renderItem={({ item }) => <CardDays days={item} showHour={false} />}
                                contentContainerStyle={{ gap: 15 }}
                                showsVerticalScrollIndicator={false}
                            />
                    } 
                </View>
        </Screen>
    );
}
