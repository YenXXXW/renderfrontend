import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export const Navbar = () => {
  const { LogOut } = useLogout()
  const { user } = useAuthContext()
  return (
    <header>
        <div className='container'>
          <Link to='/'>
              <h1>Workout Buddies</h1>
          </Link>
          <nav>
            { user && (
              <div>
                <div>{user.email}</div>
                <button onClick={LogOut}>Log Out</button>
              </div>
            )}
            {
              !user && (
                <div>
                  <Link to='/login'>Login</Link>
                  <Link to='/signup'>Sign Up</Link>
                </div>
                
              )
            }
            
          </nav>
        </div>
    </header>
  )
}
