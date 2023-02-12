import React from 'react'
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux'

const HomeScreen = () => {

  const { user } = useSelector(state => state.auth)

  return (
    <>
      <div className='wrapper'>
        <div className='content'>
         
        </div>
      </div>
    </>
  )
}

export default HomeScreen
