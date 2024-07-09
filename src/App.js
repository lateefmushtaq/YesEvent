import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthProvider';
import MyForm from './Form';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<MyForm />} />

          <Route path="/register" element={<Signup />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
