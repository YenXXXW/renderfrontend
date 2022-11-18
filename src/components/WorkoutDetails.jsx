import { useWorkoutContext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetails = ({workout}) => {
  const { dispatch } =useWorkoutContext()
  const { user } = useAuthContext()
  const handleDelete =async()=>{
    if(!user){
      return
    }
    const res = await fetch("/api/workouts/"+workout._id , {
      method : "DELETE" ,
      headers : { 'Authorization' : `Bearer ${user.token}` }
    })
    const data = await res.json()
    
    if(res.ok){
      dispatch({type : 'DELETE_WORKOUT' , payload : data})
    }
  }
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load(kg) : </strong>{workout.load}</p>
      <p><strong>reps(kg) : </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt) , { addSuffix : true })}</p>
      <span onClick={handleDelete}>DELETE</span>
    </div>
  )
}

export default WorkoutDetails