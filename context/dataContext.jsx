import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
import * as Location from 'expo-location';
import {EXPO_PUBLIC_API_URL_TODAY, EXPO_PUBLIC_API_KEY_WEATHER, EXPO_PUBLIC_API_URL_DAYS, EXPO_PUBLIC_API_URL_GEOCODING} from '@env'
import { getLatAndLong } from '../utils/getLatAndLon';

const initialState = {
    weatherData: null,
    location: null,
    errorFetchingMessage: null,
    cityInfo: null,
    daysAfter: null,
    searchedCity: null,
    searchedWeather: null
};

function reducer(state, action) {
    switch (action.type) {
        case 'PERMISSION_LOCATION':
            return { ...state, location: action.payload };
        case "DATA_WEATHER":
            return { ...state, weatherData: action.payload };
        case "ERROR_FETCHING_MESSAGE":
            return { ...state, errorFetchingMessage: action.payload };
        case "GET_CITY_INFO":
            return { ...state, cityInfo: action.payload };
        case "GET_DAYS_AFTER":
            return { ...state, daysAfter: action.payload };
        case 'GET_SEARCHED_CITY':
            return { ...state, searchedCity: action.payload, searchedWeather: null }; // Limpiamos searchedWeather
        case 'GET_SEARCHED_WEATHER':
            return { ...state, searchedWeather: action.payload };
        default:
            return state; 
    }
}


export const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getPermissions();
    }, []);

    useEffect(() => { 
        if (state.location && state.location.coords) {
            const { latitude: lat, longitude: lon } = state.location.coords;
            getData(lat, lon);
            getInfoDaysAfter(lat, lon)
        }
    }, [state.location]);

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
         //Este hace el request al usuario, se desestructura para obtener solo el status.
        //solicita por uso de location en segundo plano.
        console.log(status);
        if (status === 'granted') {
            let current = await Location.getCurrentPositionAsync({});
            //Si el status es garantizado, este lo agarra.
            dispatch({ type: "PERMISSION_LOCATION", payload: current });
            //Le asigna el valor a location del estado
        } else {
            console.log('Please grant permission');
            dispatch({ type: "PERMISSION_LOCATION", payload: null });
        }
    };

    const showLog = () => {
        console.log("Funciona");
    };

    const getData = async (lat, lon) => {
        try {
            const response = await axios.get(`${EXPO_PUBLIC_API_URL_TODAY}lat=${lat}&lon=${lon}&appid=${EXPO_PUBLIC_API_KEY_WEATHER}`);
            return response.data; 
        } catch (error) {
            console.error("Hubo un error:", error);
            dispatch({ type: "ERROR_FETCHING_MESSAGE", payload: "Hubo un error!" });
            throw error; 
        }
    };
    

    const getCityInfo = (id)=>{
        axios.get(`${EXPO_PUBLIC_API_URL_TODAY}id=${id}&&appid=${EXPO_PUBLIC_API_KEY_WEATHER}`)
            .then(res=> {
                dispatch({type: "GET_CITY_INFO", payload: res.data})
                dispatch({type: "ERROR_FETCHING_MESSAGE", payload: null})
            })
            .catch(err=> {
                dispatch({type: "ERROR_FETCHING_MESSAGE", payload: "Hubo un error!"}) 
                console.error("Error:",err);
            })
    }

    const getInfoDaysAfter = (lat, lon)=>{
        axios.get(`${EXPO_PUBLIC_API_URL_DAYS}lat=${lat}&lon=${lon}&appid=${EXPO_PUBLIC_API_KEY_WEATHER}`)
            .then(res=> {
                dispatch({type: "GET_DAYS_AFTER", payload: res.data})
                dispatch({type: "ERROR_FETCHING_MESSAGE", payload: null})
            }
            )
            .catch(err=> {
                console.error(err)
                dispatch({type: "ERROR_FETCHING_MESSAGE", payload: "Hubo un error!"}) 
            }
        )
    }

    const searchLoacation = (value)=>{
        axios.get(`${EXPO_PUBLIC_API_URL_GEOCODING}q=${value}&limit=10&appid=${EXPO_PUBLIC_API_KEY_WEATHER}`)
            .then(r => {
                dispatch({type: "GET_SEARCHED_CITY", payload: r.data})
            })
            .catch(err => console.error(err))
    }
    
    useEffect(() => {
        if (state.searchedCity) {
            const array = getLatAndLong(state.searchedCity);
            console.log("Latitudes y longitudes buscadas:", array);
        
            // Mapeamos las llamadas a getData para obtener promesas
            const promises = array.map(i => getData(i.lat, i.lon));
        
            // Usamos Promise.all para esperar a que todas las promesas se resuelvan
            Promise.all(promises)
                .then(results => {
                    // Aquí almacenamos todos los resultados en el estado
                    dispatch({ type: "GET_SEARCHED_WEATHER", payload: results });
                    console.log("Todos los datos obtenidos:", results);
                })
                .catch(error => {
                    console.error("Error al obtener datos:", error);
                });
        }
    }, [state.searchedCity]);
    
    



    return (
        <WeatherContext.Provider value={{ state, showLog,getData, getPermissions, getCityInfo, searchLoacation, dispatch }}>
            {children}
        </WeatherContext.Provider>
    );
};
