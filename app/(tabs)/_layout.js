import { Tabs } from "expo-router";
import { CalendarIcon, EarthIcon } from "../../components/Icons.jsx";
import { View } from "react-native";
import { WeatherContextProvider } from "../../context/dataContext.jsx";

export default function TabsLayout(){
    return (
        <WeatherContextProvider>
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: '#2563eb'},
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor:'#73BEF5',
            tabBarLabelStyle: {fontSize: 13}
        }}
        >

        <Tabs.Screen 
        name="index"
        options={{
            title: "Today",
            tabBarIcon: ({color})=> <View className="mt-2"><CalendarIcon color={color} /></View>
        }}
        
        />
        <Tabs.Screen 
        name="calendar"
        options={{
            title: "Calendar",
            tabBarIcon: ({color})=> <View className="mt-2"><EarthIcon  color={color}/></View>
        }}
        />

        </Tabs>
        </WeatherContextProvider>
    )
}