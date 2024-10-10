import { Tabs } from "expo-router";
import { CalendarIcon, HomeIcon } from "../../components/Icons.jsx";
import { View } from "react-native";

export default function TabsLayout(){
    return (
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
            tabBarIcon: ({color})=> <View className="mt-2"><HomeIcon color={color} /></View>
        }}
        
        />
        <Tabs.Screen 
        name="calendar"
        options={{
            title: "Calendar",
            tabBarIcon: ({color})=> <View className="mt-2"><CalendarIcon  color={color}/></View>
        }}
        />

        </Tabs>
    )
}