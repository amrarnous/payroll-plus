import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import PaymentsHistoryPage from './pages/PaymentsHistoryPage';
import EmployeesPage from './pages/EmployeesPage';
import SalariesPage from './pages/SalariesPage';
import PublicLayout from './components/layout/PublicLayout';
import PrivateLayout from './components/layout/PrivateLayout';
import PrivateRoute from './router/PrivateRoute';
import RegisterPage from './pages/Register';
import PublicRoute from './router/PublicRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>

          <Route element={<PrivateLayout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/payments-history" element={<PaymentsHistoryPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/salaries" element={<SalariesPage />} />
            </Route>
          </Route>


        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;