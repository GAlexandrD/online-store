import HomePage from './pages/HomePage';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RegistrationPage from './pages/RegistrationPage';
import Navbar from './components/Navbar';
import DevicePage from './pages/DevicePage';
import BasketPage from './pages/BasketPage';
import BasketDevicePage from './pages/BasketDevicePage';
import AdminPannel from './pages/AdminPannel';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/admin-pannel" element={<AdminPannel />} />
        <Route path="/basket/device-info" element={<BasketDevicePage />} />
        <Route path="/device-info" element={<DevicePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}

export default App;
