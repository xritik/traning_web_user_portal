import React, {useState} from 'react'
import loginImage from './imgs&vdos/loginside.svg'

const Login = ({setLoginEmail, navigate, message, setMessage}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email, password)

    const login = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                // credentials: 'include',  // Include cookies (session)
            });
    
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);  // Success message
                setLoginEmail(email);
                localStorage.setItem('loginEmail', email);
                navigate('/dashboard');
            } else {
                setMessage(data.message);  // Error message
            }
        } catch (error) {
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
                                type='email' 
                                required 
                                autoFocus 
                                placeholder='Email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value.trim())}
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