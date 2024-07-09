import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthProvider';
import Login from './Login';
import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Register from './Register'
import Home from './Home';
import NavBar from './Navbar';

function App() {
  return (
    <AuthProvider>

      <NavBar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Routes>

    </AuthProvider >
  );
}

export default App;
