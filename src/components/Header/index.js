import React from 'react'
import Logo from '../../assets/images/logo.svg';
import { ProfileIconSVG } from '../../assets/svgComponents';

const index = () => {
  return (
    <section class="head">
        <div class="container">
        <div class="row">
        <header >
            <div class="outer d-flex justify-content-between">
            <a href="/"> <img src={Logo} alt="" /></a>
                <div class="dropdown ">
                    <button class="d-flex align-items-center justify-content-center btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <ProfileIconSVG />
                    <p class="mb-0 mx-2">John Doe</p>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
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