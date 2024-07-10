import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/AuthProvider';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register'
import Home from './components/Home';
import NavBar from './components/Navbar';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <AuthProvider>

      <NavBar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/createEvent" element={<PrivateRoute element={<CreateEvent />} />} />
      </Routes>

    </AuthProvider >
  );
}

export default App;
