import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import AddTraining from './AddTraining';
import SearchData from './SearchData';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add_training" element={<AddTraining />} />
        <Route path="/search" element={<SearchData />} />
      </Routes>
    </div>
  );
}

export default App;