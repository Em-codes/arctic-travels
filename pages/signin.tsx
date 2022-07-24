import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import Image from 'next/image';
import {CaretCircleLeft} from 'phosphor-react'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { variants } from '../utils/data';
import { useSelector, useDispatch } from 'react-redux'
import { register, login, reset } from '../features/auth/authSlice';
import OTPField from '../components/OTP_popup';



const signin = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [activePanel, setActivePanel] = useState(true)
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: any) => state.auth)



  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialValues);
  const onHandleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

  };


  useEffect(() => {
    if (isError) {
      alert(message)
    }

    if (!isError && !isLoading) {
      console.log(user)
    }

    if (user && user.token) {
      router.push('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, router, dispatch])


  const registerUsers = async (value: any) => {
    value.preventDefault()

    if (values.password !== values.confirmPassword) {
      alert('Passwords do not match')
    } else {
      const userData = { ...values, }

      dispatch(register(userData))

      if (isError) {
        alert(message)
      }

    }
  }

  const loginUsers = async (value: any) => {
    value.preventDefault();

    const userData = { ...values, }
    dispatch(login(userData))

    if (isError) {
      alert(message)
    }



  }




  const loader = () => {
    return (
      <Image
        src="/loading.gif"
        alt="Picture of the author"
        width={500}
        height={500}
      />
    )
  }


  return (
    <section
    className='auth-gen-wrap'
    >
    <span className='close-cta-btn' onClick={() =>router.push('/')}><CaretCircleLeft size={32} color="#24243e" weight='thin' /></span>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
        className='auth-page-wrapper'>
        <div className={`containerr ${!activePanel ? 'right-panel-active' : ''} `} >
          <div className="form-containerr sign-up-containerr">
            <form onSubmit={(e) => registerUsers(e)}>
              <h1>Create Account</h1>
              <Input name={'username'} value={values.username} label='username' type='text' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <Input name={'email'} value={values.email} label='email' type='email' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <Input name={'password'} value={values.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <Input name={'confirmPassword'} value={values.confirmPassword} label='confirm password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <button className='btn-class-form new-btn'> <span>Sign In</span> <span>{isLoading && loader()}</span></button>
              <span className='ready-span'>Already have an account?  <span onClick={() => setActivePanel(!activePanel)}>Login</span></span>
            </form>
          </div>
          <div className="form-containerr sign-in-containerr">
            <form onSubmit={(e) => loginUsers(e)}>
              <h1>Log In</h1>
              <Input name={'email'} value={values.email} label='email' type='email' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <Input name={'password'} value={values.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <button className='btn-class-form new-btn'><span>Log In</span> <span>{isLoading && loader()}</span></button>
              <span className='ready-span'>Don't have an account?  <span onClick={() => setActivePanel(!activePanel)}>Sign Up</span></span>
            </form>
          </div>
          <div className="overlay-containerr">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Hi Champ!</h1>
                <p>We've missed you. <br /> Log in let see what's up.</p>
                <button onClick={() => setActivePanel(!activePanel)}>Log In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hi Champ!</h1>
                <p>Its misty and cool out there,<br /> why not sign up lets take you on a ride 😉</p>
                <button onClick={() => setActivePanel(!activePanel)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {user && user.otpStatus === "on" && <OTPField />}

    </section>
  )
}

export default signin