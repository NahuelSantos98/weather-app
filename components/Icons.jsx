import React, { forwardRef } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

export const CalendarIcon = forwardRef((props, ref) => {
    return <Entypo name="calendar" size={24} color="black" ref={ref} {...props} />;
});

export const EarthIcon = forwardRef((props, ref) => {
    return <MaterialCommunityIcons name="earth" size={24} color="black" ref={ref} {...props} />;
});

export const WeatherIcon = forwardRef((props, ref) => {
    return <MaterialCommunityIcons name="weather-hazy" size={40} color="yellow" ref={ref} {...props} />;
});

export const WindIcon = forwardRef((props, ref) => {
    return <FontAwesome5 name="wind" size={24} color="black" ref={ref} {...props} />;
});

export const TemperatureIcon = forwardRef((props, ref) => {
    return <FontAwesome5 name="temperature-low" size={24} color="black" ref={ref} {...props} />;
});

export const HumidityIcon = forwardRef((props, ref) => {
    return <Entypo name="water" size={24} color="black" ref={ref} {...props} />;
});

export const CloudIcon = forwardRef((props, ref) => {
    return <Entypo name="icloud" size={24} color="black" ref={ref} {...props} />;
});

export const BackIcon = forwardRef((props, ref) => {
    return <Entypo name="chevron-left" size={24} color="black" ref={ref} {...props} />;
});

export const SunriseIcon = forwardRef((props, ref) => {
    return <Feather name="sunrise" size={30} color="yellow" ref={ref} {...props} />;
});

export const SunsetIcon = forwardRef((props, ref) => {
    return <Feather name="sunset" size={30} color="yellow" ref={ref} {...props} />;
});
