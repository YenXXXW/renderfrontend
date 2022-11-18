import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    //check the context is in scope
    if(!context){
        throw Error('useAuthContext must be used inside of the scope of Authcontextprovider')
    }
    return context
}