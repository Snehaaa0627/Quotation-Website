import React from 'react';
import Login from './Login/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Customer from './Contents/Customer';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;