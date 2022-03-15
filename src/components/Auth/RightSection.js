import React, { useState } from 'react'
import Logo from '../../assets/images/logo.svg'
import LoginForm from '../Form/LoginForm'
import SignUpForm from '../Form/SignUpForm';

const RightSection = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div class="col-lg-7 loginn">
        <div class="login">
            <div class="logo text-center">
                <img src={Logo} alt=""/>
                <h3>
                    {isLogin ? 'Login' : 'SignUp'} your account
                </h3>
            </div>
            {
                isLogin
                ?
                <LoginForm setIsLogin={setIsLogin} />
                :
                <SignUpForm setIsLogin={setIsLogin} />
            }
        </div>
    </div>
  )
}

export default RightSection