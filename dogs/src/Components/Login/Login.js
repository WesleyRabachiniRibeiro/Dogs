import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import LoginCreate from './LoginCreate'
import LoginForm from './LoginForm'
import LoginPasswordLost from './LoginPasswordLost'
import LoginPaswwordReset from './LoginPaswwordReset'
import styles from './Login.module.css'

function Login() {
  
  const {login} = React.useContext(UserContext);

  if(login === true) return <Navigate to="/account" />
  
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />}/>
          <Route path="sign-in/create" element={<LoginCreate />}/>
          <Route path="sign-in/forget-password" element={<LoginPasswordLost />}/>
          <Route path="sign-in/reset-password" element={<LoginPaswwordReset />}/>
        </Routes>
      </div>
    </section >
  )
}

export default Login
