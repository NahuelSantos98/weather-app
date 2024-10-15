import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";

export function Screen({ children }) {
    return (
        <SafeAreaProvider>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#38bdf8', '#2563eb']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-1"
            >
                <View className="flex-1 items-center px-2 pt-5">
                    {children}
                </View>
            </LinearGradient>
        </SafeAreaProvider>
    )
}
