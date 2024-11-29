import React, {useState} from 'react'
import loginImage from './imgs&vdos/loginside.svg'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <section>
        <div className='loginSection'>
            <div className='loginForm'>
                <div className='name'>Training.</div>
                <div className='loginPage'>
                    <div className='login'>
                        <span className='welcomeText'>Welcome to you!</span> <span className='welcomeText'>Login into your account</span>
                        <form className='form1'>
                            <input className='email' type='email' required autoFocus placeholder='Email address'/>
                            <input className='password' type={showPassword ? 'text' : 'password'} required placeholder='Password'/>
                            <span>Show Password <input type='checkbox' onChange={() => setShowPassword(!showPassword)} /></span>
                            <button className='loginButton'>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='loginImage'>
                <img src={loginImage} alt='img'/>
            </div>
        </div>
    </section>
  )
}

export default Login