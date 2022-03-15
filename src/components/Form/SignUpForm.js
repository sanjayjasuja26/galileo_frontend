import React from 'react'
import { EmailIconSVG, PasswordIconSVG, UserIconSVG } from '../../assets/svgComponents'

const SignUpForm = ({setIsLogin}) => {
  return (
    <form class="form">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">First Name</label>
            <div class="username">
                <UserIconSVG />
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="John" />
            </div>
            </div>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Last Name</label>
            <div class="username">
                <UserIconSVG />
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="John" />
            </div>
            </div>
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
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Re-type Password</label>
            <div class="username">
                <PasswordIconSVG />
                <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" />
            </div>
            </div>
        
            <button type="button" class="btn btn-primary">Signup</button>
            <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
            <div class="bottom-text important-link">
            <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Support</a></li>
            </ul>
        </div>
    </form>
    )
}

export default SignUpForm