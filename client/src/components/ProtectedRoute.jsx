import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if token exists in browser memory
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, kick them to Login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, let them see the page
  return children;
};

export default ProtectedRoute;