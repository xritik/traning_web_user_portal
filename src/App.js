import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import AddTraining from './AddTraining';
import SearchData from './SearchData';

function App() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState(localStorage.getItem('loginEmail') || '');
  const [message, setMessage] = useState('');
  console.log('LoginEmail:- ',loginEmail);

  useEffect(() => {
    if (loginEmail) {
      localStorage.setItem('loginEmail', loginEmail);
    } else {
      localStorage.removeItem('loginEmail');
    }
  }, [loginEmail]);

  // Logout function
  const logout = () => {
    localStorage.removeItem('loginEmail'); // Remove user from localStorage
    navigate('/login');
    setMessage('Successfully logged out')
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setLoginEmail={setLoginEmail} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/login" element={<Login setLoginEmail={setLoginEmail} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/dashboard" element={<Dashboard logout={logout} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/add_training" element={<AddTraining logout={logout} setMessage={setMessage} navigate={navigate} />} />
        <Route path="/search" element={<SearchData logout={logout} />} />
      </Routes>
    </div>
  );
}

export default App;