import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg'
import ForgotPassword from '../Form/ForgotPassword';
import LoginForm from '../Form/LoginForm'
import ResetPassword from '../Form/ResetPassword';
import SignUpForm from '../Form/SignUpForm';

const RightSection = () => {

  const [search] = useSearchParams();
  const mode = search.get('mode');

  const [isLogin, setIsLogin] = useState(true);
  const [isForgetPwd, setIsForgetPwd] = useState(false);
  const [heading, setHeading] = useState('');
  const [section, setSection] = useState('');

  useEffect(() => {
    if(isLogin){
        setHeading('Login your account')
        setSection(<LoginForm setIsForgetPwd={setIsForgetPwd} setIsLogin={setIsLogin} />)
    } else {
        setHeading('SignUp your account')
        setSection(<SignUpForm setIsForgetPwd={setIsForgetPwd} setIsLogin={setIsLogin} />)
    }

    if(mode === 'resetPassword'){
        setHeading('Reset Password')
        setSection(<ResetPassword setIsLogin={setIsLogin} />)
    }
    if(isForgetPwd){
        setHeading('Forgot Password')
        setSection(<ForgotPassword setIsForgetPwd={setIsForgetPwd} setIsLogin={setIsLogin} />)
    }
  }, [isLogin, isForgetPwd, mode])

  return (
    <div className="col-lg-7 loginn">
        <div className="login">
            <div className="logo text-center">
                <img src={Logo} alt=""/>
                <h3>{heading}</h3>
            </div>    
                {section}
        </div>
    </div>
  )
}

export default RightSection