import { useEffect, useState } from "react"

export const useDebounce = (value, delay = 500)=>{ 
    //Buena practica darle un valor default
    
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(()=>{
        const timeout =setTimeout(()=> {
            setDebounceValue(value)
            //Setea el value
        }, delay)

        return ()=> clearTimeout(timeout) 
        //Limpia el timeout
        //No deja timeout pendiente si es que el value cambia
}, [value, delay])

return debounceValue;

}