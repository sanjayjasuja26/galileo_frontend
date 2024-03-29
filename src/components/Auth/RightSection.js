import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/images/logo.svg";
import { EnvelopeIconSVG } from "../../assets/svgComponents";
import { updateUser, varifyEmailLink } from "../../redux/action/auth";
import { updateUserDocument } from "../../utils/helper";
import ForgotPassword from "../Form/ForgotPassword";
import LoginForm from "../Form/Login";
import ResetPassword from "../Form/ResetPassword";
import SignUpForm from "../Form/SignUp";

const RightSection = () => {   

  const navigate = useNavigate();
  const dispatch = useDispatch();                       
  const { user } = useSelector(state => state.auth)

  const [search] = useSearchParams();
  const mode = search.get("mode");       
  const code = search.get("oobCode");

  const [isLogin, setIsLogin] = useState(true);
  const [isForgetPwd, setIsForgetPwd] = useState(false);
  const [heading, setHeading] = useState("");  
  const [section, setSection] = useState("");            
    
  const displaySection = useCallback(async (isLogin, isForgetPwd, mode) => {
    if (isLogin && !mode) {              
      setHeading("Login your account");
      setSection(               
        <LoginForm setIsForgetPwd={setIsForgetPwd} setIsLogin={setIsLogin} />
      );                              
    } else {                                                   
      setHeading("SignUp your account");
      setSection(
        <SignUpForm setIsForgetPwd={setIsForgetPwd} setIsLogin={setIsLogin} />
      );
    }              

    if (mode === "resetPassword") {
      setHeading("Reset Password");
      setSection(    
        <ResetPassword
          code={code}    
          setIsLogin={setIsLogin}
          setIsForgetPwd={setIsForgetPwd}
        />                 
      );
    }

    if (mode === "verifyEmail") {  
      setHeading("Email Verification");
      setSection(                           
        <p className="text-center">
          <EnvelopeIconSVG />                          
          Please wait. We are verifying your email.
        </p>                           
      );

      const varified = await varifyEmailLink({ code });
      if (varified) {
          const isUpdated = await updateUserDocument({       
            verify: true,              
          });                                               
  
          if(isUpdated) {
            toast.success("Email varified success");
            if(user) {                      
              dispatch(updateUser({ verify: true }));
              navigate("/");
            } else {                                 
              navigate("/auth");
            }
          }       
      }                   
    }
                      
    if (isForgetPwd) {                 
      setHeading("Forgot Password");
      setSection(               
        <ForgotPassword
          setIsForgetPwd={setIsForgetPwd}
          setIsLogin={setIsLogin}
        />
      );                         
    }   
  }, [code, user, navigate, dispatch]);      

  useEffect(() => {                     
    displaySection(isLogin, isForgetPwd, mode);
  }, [isLogin, isForgetPwd, mode, displaySection]);     

  return (
    <div className="col-lg-7 loginn signup">  
      <div className="login">
        <div className="logo text-center">
          <img src={Logo} alt="" />
          <h3>{heading}</h3>                     
        </div>                 
        {section}   
      </div>
    </div>
  );
};

export default RightSection;
