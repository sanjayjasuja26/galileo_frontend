import React from 'react';
import CSSModules from 'react-css-modules';
import './auth.css';
import LeftContent from '../../components/Auth/LeftContent'
import RightSection from '../../components/Auth/RightSection'

const Auth = () => {
  return (
    <div className="container-fluid p-0">
        <div className="row">
            <LeftContent />
            <RightSection />
        </div>
    </div>
  )
}

export default Auth;