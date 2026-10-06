import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Token በ LocalStorage ወይም በ Auth Context ውስጥ መኖሩን ማረጋገጥ
  const token = localStorage.getItem('token'); 

  if (!token) {
    // Token ከሌለ በቀጥታ ወደ login ገጽ ይመልሰዋል
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;