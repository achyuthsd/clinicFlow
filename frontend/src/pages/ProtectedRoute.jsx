import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accid = localStorage.getItem("accid");

  if (!accid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
