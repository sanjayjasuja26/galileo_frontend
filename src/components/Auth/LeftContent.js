import React from 'react';
import Logo from '../../assets/images/logo.svg';

const LeftContent = () => {
  return (
    <div className="col-lg-5">
    <div className="leftside">
       <div className="upper-content">
        <div className="small-screen mb-4">
            <img src={Logo} alt=""/>
        </div>
        <h2>Galileo Radiology <br /><span>Education</span></h2>
        <p>Galileo Radiology Education is available to partner academic medical institutions and hospitals.</p>
       </div>
       <div className="bottom-text">
           <ul>
               <li><a href="#">About us</a></li>
               <li><a href="#">Support</a></li>
           </ul>
       </div>
    </div>
    </div>
  )
}

export default LeftContent