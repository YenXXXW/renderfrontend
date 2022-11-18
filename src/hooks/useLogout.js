import { useAuthContext } from './useAuthContext'
import { useWorkoutContext } from './useWorkoutContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch : workoutDispatch } = useWorkoutContext()

    const LogOut=()=>{
        localStorage.removeItem('user')

        //set user back to null when not logged in
        dispatch({type : "LOG_OUT"})

        //remove workouts from global state
        workoutDispatch({type : "SET_WORKOUTS" , payload : null})
    }
    return{
        LogOut
    }
}
