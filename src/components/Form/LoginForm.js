import React from 'react'
import { EmailIconSVG, PasswordIconSVG } from '../../assets/svgComponents'

const LoginForm = ({setIsLogin}) => {
  return (
    <form class="form">
        <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Institutional Email</label>
                    <div class="username">
                        <EmailIconSVG />
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Johndoe@gmail.com" />
                    </div>
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Password</label>
        <div class="username">
            <PasswordIconSVG />
            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" />
        </div>
        </div>
        <div class="paasrd d-flex justify-content-between">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">
                Remember me
            </label>
            </div>
            <a href="#">Forgot password?</a>
        </div>
        <button type="button" class="btn btn-primary">Login</button>
        <p>Don’t have an account? <span onClick={() => setIsLogin(false)}>Signup</span></p>
        <div class="bottom-text important-link">
                    <ul>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
        </div>
    </form>
  )
}

export default LoginForm