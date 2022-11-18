import { createContext , useEffect, useReducer } from 'react'

export const AuthContext = createContext({})

export const authReducer =(state , action)=>{
    switch (action.type) {
        case "LOG_IN" : 
            console.log('tha action is performing');
            return { user : action.payload}
        case "LOG_OUT" :
            return { user : null }
        default :
            return { state }
    }
}

export const AuthContextProvider = ({children})=>{

    const [state , dispatch ] = useReducer(authReducer , {
        user : null
    })

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:"LOG_IN" , payload:user})
        }
    },[])

    console.log('Auth state :' , state)
    return(
        <AuthContext.Provider value={{...state , dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}