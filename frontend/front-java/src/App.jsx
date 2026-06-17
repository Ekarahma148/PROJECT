import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskList from "./pages/TaskList";
import Profile from "./pages/Profile";
// import UserManagement from "./pages/UserManagement";
import AdminDashboard from "./pages/AdminDashboard";
// import AdminRoute from "./components/AdminRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/Adminusers";
import AdminTaskMonitoring from "./pages/AdminTaskMonitoring";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/tasks" element={<AdminTaskMonitoring />} />

        {/* <Route path="/admin/users" element={<AdminUsers />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
