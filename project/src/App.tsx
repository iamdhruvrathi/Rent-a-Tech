import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ItemsPage from './pages/ItemsPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CartPage from './pages/CartPage';
import OwnerDashboard from './pages/OwnerDashboard';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute requiredRole="renter">
                  <CartPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-item" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <AddItemPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-item/:id" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <EditItemPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;