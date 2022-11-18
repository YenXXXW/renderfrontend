import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

export const WorkoutForm = () => {
  const { user } = useAuthContext()
  const { dispatch } = useWorkoutContext()
  const [title , setTitle] = useState('')
  const [load , setLoad] = useState('')
  const [reps , setReps] = useState('')  
  const [error , setError] = useState(null)  
  const [ emptyFields , setEmptyFields ] = useState([])

  const handleSubmit=async(e)=>{
    e.preventDefault()

    if(!user){
      setError("You must login first")
      return 
    }
    const workout={title , reps , load }
    const res = await fetch('/api/workouts' , {
        method : 'POST' , 
        body : JSON.stringify(workout) , 
        headers : {
          "Content-Type" : 'application/json' ,
          'Authorization' : `Bearer ${user.token}`             
        }
    })
    const data = await res.json()
    if(!res.ok){
        setError(data.error)
        setEmptyFields(data.emptyFields)
    }
    if(res.ok){
        dispatch({type : "CREATE_WORKOUT" , payload : data})
        setEmptyFields([])
        setError('')
        setTitle('')
        setLoad('')
        setReps('')
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a workout</h3>  
      <label>Exercise title:</label>
      <input
        type='text'
        onChange={(e)=>setTitle(e.target.value)}  
        value ={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Load(kg):</label>
      <input
        type='text'
        onChange={(e)=>setLoad(e.target.value)}  
        value ={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label>Reps(kg):</label>
      <input
        type='text'
        onChange={(e)=>setReps(e.target.value)}  
        value ={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
