import { useContext } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)
    //check the context is in scope
    if(!context){
        throw Error('useWorkoutContext must be used inside of the scope of Workoutcontextprovider')
    }
    return context
}
