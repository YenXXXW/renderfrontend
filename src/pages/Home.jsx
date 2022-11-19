import React , { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import { WorkoutForm } from '../components/WorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

export const Home = () => {
  const { workouts , dispatch } = useWorkoutContext()
  const  { user } = useAuthContext()
  console.log( 'user is' , user);

  useEffect(()=>{
    const fetchWorkout = async()=>{
      const res = await fetch('https://renderbackend.onrender.com' , {
        headers : {
          'Authorization' : `Bearer ${user.token}` 
        }
      })
      const data = await res.json()
      if(res.ok){
        dispatch({ type : 'SET_WORKOUTS' , payload : data })
      }
    }
    if(user){
      fetchWorkout()
    }
  },[dispatch , user])

  return (
    <div className='home'>
      <div className='workouts'>
        { workouts && workouts.map(workout =>(
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <WorkoutForm/>
    </div>
    
  )
}
