import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProfileIconSVG } from '../../assets/svgComponents';
import { logOut } from '../../redux/action/auth';
import Logo from '../../assets/images/logo.svg';
import useOutsideClick from '../../hooks/useOutsideClick';

const Header = () => {    

    const ref = useRef(null);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [showPopUp, setShowPopUp] = useState(false);

    useOutsideClick(ref, () => {
        setShowPopUp(!showPopUp)
    })

  return (
    <section className="head">
        <div className="container">
        <div className="row">  
        <header>   
            <div className="outer d-flex justify-content-between">
            <Link to="/"> <img src={Logo} alt="" /></Link>
                <div className="dropdown">  
                    <button onClick={() => setShowPopUp(!showPopUp)} className="d-flex align-items-center justify-content-center btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1">
                        {
                            user.image    
                            ?
                            <img src={user.image} alt="" className="rounded rounded-circle" height={20} width={20} />
                            :     
                            <ProfileIconSVG />
                        }    
                        <p className="mb-0 mx-2">
                            {
                                (user.fname && user.lname) ? `${user.fname} ${user.lname}` : 'John Doe'
                            }
                        </p>
                    </button>
                    {
                        (showPopUp) 
                        ?
                        <ul className="dropdown-menu shadow-sm" ref={ref}>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={() => dispatch(logOut())}>Logout</button>
                            </li>
                        </ul>
                        : 
                        ''
                    }
                </div>
            </div>
        </header>
        </div>
        </div>
    </section>
  )
}

export default Header;