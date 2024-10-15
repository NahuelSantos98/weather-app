export function formatWeatherDate(timestamp) {
    const date = new Date(timestamp * 1000); 
    const options = { weekday: 'long', month: 'long', day: 'numeric' }; 
    return date.toLocaleDateString('en-EN', options); 
}
