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
  const HOST = `${window.location.hostname}`;
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
        <Route path="/" element={<Login HOST={HOST} setLoginName={setLoginName} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/login" element={<Login HOST={HOST} setLoginName={setLoginName} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/dashboard" element={<Dashboard HOST={HOST} logout={logout} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/add_training" element={<AddTraining HOST={HOST} logout={logout} setMessage={setMessage} navigate={navigate} />} />
        <Route path="/search" element={<SearchData HOST={HOST} logout={logout} navigate={navigate} />} />
        <Route path="/edit_training" element={<EditTraining HOST={HOST} setMessage={setMessage} navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;