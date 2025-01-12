import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Report from '../pages/admin/Report';
import Login from '../pages/admin/login';
import Register from '../pages/admin/register';
import ProtectedRoute from "../Routerlist/ProtectedRoute";

const ReportLayout = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Report", path: "/report" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-8 cursor-pointer"
          onClick={()=>navigate('/')}>Admin Panel</h1>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-800 cursor-pointer"
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl">Dashboard Report</h2>
          <Button
            style="primary"
            text="Logout"
            onClick={() => {
    localStorage.removeItem('authToken'); // Hapus token
    navigate('/login'); // Arahkan ke halaman login
  }}
          />
        </header>

        {/* Main */}
        <main className="flex-1 p-6 bg-gray-50 w-screen">
          <Routes>
            <Route
              index
              element={<ProtectedRoute>
                <div>Welcome to the Admin Dashboard! Select a menu item to get started.</div>
              </ProtectedRoute>}
            />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>© 2024 Admin Dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default ReportLayout;
