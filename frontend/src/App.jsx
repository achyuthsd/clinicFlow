import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx'
import Navbar from './pages/Navbar.jsx';
import Footer from './pages/Footer.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import PatientRegister from './pages/PatientRegister.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/receptionist-dashboard"
          element={
            <ProtectedRoute>
              <PatientRegister />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
