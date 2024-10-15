export function getLatAndLong(a) {
    return a.map(e => ({
        lat: e.lat,
        lon: e.lon
    }));
}
