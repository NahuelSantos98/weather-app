import { Link, Stack } from "expo-router";
import { useContext } from "react";
import { WeatherContext } from "../context/dataContext";
import { CardDetail } from "../components/CardDetail";
import { Screen } from "../components/Screen";
import { BackIcon } from "../components/Icons";
import { CardDays } from "../components/CardDays";
import { View, FlatList, StyleSheet } from 'react-native';

export function DetailWeather() {
    const { state } = useContext(WeatherContext);
    const days = state.daysAfter?.list.slice(0, 10) || []; // Asegúrate de que esta línea es correcta
    
    return (
        <Screen>
            <Stack.Screen 
                options={{
                    headerLeft: () => (<Link href={`/`} asChild><BackIcon /></Link>)
                }}
            />
            <CardDetail weatherData={state.weatherData} />
            <View style={styles.container}>
                <FlatList 
                    data={days}
                    keyExtractor={(item) => item.dt.toString()} 
                    renderItem={({ item }) => <CardDays days={item} showHour={true} />} 
                    contentContainerStyle={{ paddingBottom: 20, gap: 15 }} 
                    showsVerticalScrollIndicator={false} // Opcional: oculta el indicador de desplazamiento
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Hace que el contenedor ocupe toda la pantalla disponible
        paddingHorizontal: 16, // Espaciado horizontal opcional
        paddingBottom: 20, // Espaciado inferior
        marginTop: 10,
        width: '100%'
    },
});