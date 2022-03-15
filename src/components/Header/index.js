import React from 'react'
import Logo from '../../assets/images/logo.svg';

const index = () => {
  return (
    <header >
        <div class="outer d-flex justify-content-between">
        <a href="/"> <img src={Logo} alt="" /></a>
            <div class="dropdown ">
                <button class="d-flex align-items-center justify-content-center btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <img  src="./images/profile.svg" alt="" />
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
  )
}

export default index