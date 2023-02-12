import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, logout } from '../redux/auth/authSlice'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='navbar'>
      
      <div className='menu'>
        <ul>
          {!user ? (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={logoutHandler}>
                  {' '}
                  <FaSignOutAlt /> Logout{' '}
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
