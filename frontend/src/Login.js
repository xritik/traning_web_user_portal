import React, { useState, useEffect } from 'react'
import loginImage from './imgs&vdos/loginside.svg'

const Login = ({setLoginName, navigate, message, setMessage}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');



    useEffect(() => {
        if(message){
            const timeout = setTimeout(() => {
                setMessage('');
            }, 5000);
    
            return () => clearTimeout(timeout); // Cleanup the timeout
        }
    }, [message, setMessage]);


    const login = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
                // credentials: 'include',  // Include cookies (session)
            });
    
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);  // Success message
                setLoginName(name);
                localStorage.setItem('loginName', name);
                navigate('/dashboard');
            } else {
                setMessage(data.message);  // Error message
            }
        } catch (error) {
            navigate('/login');
            console.error("Error logging in:", error);
            setMessage('An error occurred. Please try again.');
        }
    };

  return (
    <section>
        <div className='loginSection'>
            <div className='loginForm'>
                <div className='name'>Training.</div>
                <div className='loginPage'>
                    <div className='login'>
                        <span className='welcomeText'>Welcome to you!</span> <span className='welcomeText'>Login into your account</span>
                        <form className='form1' onSubmit={(e) => {e.preventDefault(); login()}}>
                            <input className='email'
                                type='text'
                                required
                                autoFocus
                                placeholder='Email address'
                                value={name}
                                onChange={(e) => setName(e.target.value.trim())}
                            />
                            <input className='password'
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value.trim())}
                            />
                            <span>Show Password <input type='checkbox' onChange={() => setShowPassword(!showPassword)} /></span>
                            <button className='loginButton'>Log In</button>
                            {message && <p style={{marginTop:'10px', color:'red'}}>{message}</p>}
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