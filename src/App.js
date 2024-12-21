import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import AddTraining from './AddTraining';
import SearchData from './SearchData';
import EditTraining from './EditTraining';

function App() {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState(localStorage.getItem('loginName') || '');
  const [message, setMessage] = useState('');
  console.log('LoginName:- ',loginName);

  useEffect(() => {
    if (loginName) {
      localStorage.setItem('loginName', loginName);
    } else {
      localStorage.removeItem('loginName');
    }
  }, [loginName]);

  // Logout function
  const logout = () => {
    localStorage.removeItem('loginName'); // Remove user from localStorage
    localStorage.removeItem('trainingToEdit');
    navigate('/login');
    setMessage('Successfully logged out')
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setLoginName={setLoginName} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/login" element={<Login setLoginName={setLoginName} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/dashboard" element={<Dashboard logout={logout} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/add_training" element={<AddTraining logout={logout} setMessage={setMessage} navigate={navigate} />} />
        <Route path="/search" element={<SearchData logout={logout} navigate={navigate} />} />
        <Route path="/edit_training" element={<EditTraining setMessage={setMessage} navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;