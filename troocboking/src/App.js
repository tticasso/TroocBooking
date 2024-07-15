import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import LayoutPage from './components/admin/Dashboard';
import UserManagement from './components/admin/UserManage';
import FilmManage from './components/admin/FilmManage';
import OrderManagement from './components/admin/OrderManage';
const App = () => {
  return (
    <div className="w-screen h-auto bg-[#131217]">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<LayoutPage />}>
            <Route path="user-manage" element={<UserManagement />} />
            <Route path="film-manage" element={<FilmManage />} />
            <Route path="order-manage" element={<OrderManagement />} />
          </Route>
        </Routes>
      </Router>
    </div>

  );
};

export default App;
