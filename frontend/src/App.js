import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" element={<Dashboard />} />}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;