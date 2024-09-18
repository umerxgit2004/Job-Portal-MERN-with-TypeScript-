import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/CreateUserForm';

function App() {
  return (
    <Router>
    <Routes>
        {/* <Route path="/" element={} /> */}
        <Route path="/about" element={<Form />} />
    </Routes>
</Router>
  );
}

export default App;
