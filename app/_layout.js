import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherIcon } from '../components/Icons';
import { WeatherContextProvider } from '../context/dataContext';

export default function Layout() {
    return (
        <>
        <WeatherContextProvider>
            <View className="flex-1">
                <Stack
                    screenOptions={{
                        headerBackground: () => (
                            <LinearGradient
                                colors={['#2563eb', '#38bdf8']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                className="flex-1"
                            />
                        ),
                        headerTintColor: '#ffff',

                        headerTitle: ()=>(<><WeatherIcon /><Text className="text-white text-lg underline font-bold">Weather App</Text></>)
                    }}
                />
            </View>
            </WeatherContextProvider>
        </>
    );
}
