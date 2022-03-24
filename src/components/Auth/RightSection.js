import React, { useState } from 'react'
import Logo from '../../assets/images/logo.svg'
import ForgetPassword from '../Form/ForgetPassword';
import LoginForm from '../Form/LoginForm'
import SignUpForm from '../Form/SignUpForm';

const RightSection = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isForgetPwd, setIsForgetPwd] = useState(true);

  return (
    <div className="col-lg-7 loginn">
        <div className="login">
            <div className="logo text-center">
                <img src={Logo} alt=""/>
                {
                    isForgetPwd ?
                    <h3>Forget Password</h3>
                    :
                    <h3>
                        {isLogin ? 'Login' : 'SignUp'} your account
                    </h3>
                }
            </div>    
            {
                isForgetPwd
                ?
                <ForgetPassword />
                : 
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