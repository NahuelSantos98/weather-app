export function getDay(a) {
    if (!a || !a.list) {
        console.error('El objeto pasado no tiene la estructura esperada.');
        return [];
    }
    
    const daysInfo = [];
    
    // Iterar por cada elemento de la lista
    a.list.forEach((e, i) => {
        const currentDay = e.dt_txt.slice(8, 10);

    //Si es el primer elemento, o si el currentDay es diferente al dia del index anterior
        if (i === 0 || currentDay !== a.list[i - 1].dt_txt.slice(8, 10)) {
            daysInfo.push(e);
        }
    });
    return daysInfo;
}
