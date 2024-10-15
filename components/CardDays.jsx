import { View, Text, Image } from 'react-native';

export function CardDays({ days , showHour}) {
    const { main, weather, dt_txt } = days;

    const temp = main.temp; 
    const weatherTitle = weather[0]?.main; // Título del clima
    const tempCelsius = (temp - 273.15).toFixed(1); 
    const imgurl = `http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`; // URL de la imagen
    const dateAndHour = dt_txt.slice(0,16).replace(" ", " / ")
    const dateOnly = dt_txt.slice(0, 10)


    return (
        <View className="bg-blue-950 px-5 rounded-xl" >
            <View>
                {showHour ? <Text className="text-center text-white pt-1 font-bold">{dateAndHour}</Text> : <Text className="text-center text-white pt-1 font-bold">{dateOnly}</Text>}
            </View>
            <View className="flex-row items-center justify-between">
            <Image source={{ uri: imgurl }} className="h-10 w-10" />
            <Text className="text-white font-bold" >{weatherTitle}</Text>
            <Text className="text-white font-bold">{`${tempCelsius}°C`}</Text>
            </View>
        </View>
    );
}
