import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  if (
  !token ||
  token === "null" ||
  token === "undefined"
) {
  return <Navigate to="/403" replace />;
}

  if (role !== "USER") {
    return <Navigate to="/403" replace />;
  }

  return children;
}

export default ProtectedRoute;