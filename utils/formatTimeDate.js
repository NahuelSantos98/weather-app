export function formatTimeDate(dt) {
    const currentDate = new Date(dt * 1000);
    
    const currentHour = currentDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });

    return currentHour; 
}
