import React from 'react'
import Logo from '../../assets/images/logo.svg';
import { ProfileIconSVG } from '../../assets/svgComponents';

const index = () => {
  return (
    <section className="head">
        <div className="container">
        <div className="row">
        <header >
            <div className="outer d-flex justify-content-between">
            <a href="/"> <img src={Logo} alt="" /></a>
                <div className="dropdown ">
                    <button className="d-flex align-items-center justify-content-center btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <ProfileIconSVG />
                    <p className="mb-0 mx-2">John Doe</p>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
        </header>
        </div>
        </div>
    </section>
  )
}

export default index;