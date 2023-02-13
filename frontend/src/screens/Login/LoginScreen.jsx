import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import classes from './LoginScreen.module.css'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from  '../../components/Spinner'
import { login, reset } from '../../redux/auth/authSlice'

const LoginScreen = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = loginData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isSuccess, isLoding, isError, message } = useSelector(state => state.auth)


    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/profile')
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, dispatch, navigate])

    const onChange = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const formSubmit = (e) => {
        e.preventDefault()
        if(email === '' || password === ''){
            toast.error('Please enter email and password')
        }else{
            const userData = {
                email,
                password
            }
            dispatch(login(userData))
        }
    }

    if(isLoding){
        return <Spinner />
    }

  return (
    <div>
        <div className={classes.formHeading}>
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Please login to leave a message</p>
        </div>
        <form className={classes.loginForm} onSubmit={formSubmit}>
            <input type="email" id='email' name='email' value={email}
            placeholder='Enter your email' required onChange={onChange} />
            <input type="password" id='password' name='password' value={password}
            placeholder='Enter your password' onChange={onChange} />
            <button className={classes.loginButton}>Submit</button>
        </form>
    </div>
  )
}

export default LoginScreen