import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AppProvider } from "@/contexts/AppContext";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Auth/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import { useEffect } from "react";

function ProtectedRoute({ auth, children }) {
  return auth ? children : <Navigate to="/auth" replace />;
}
function PublicRoute({ auth }) {
  return !auth ? <Login /> : <Navigate to="/" replace />;
}
function Logout() {
  useEffect(() => {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      window.location.href = "/auth";
    });
  }, []);

  return <div>Logging out...</div>;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute auth={user}>
            <AppProvider creator={user}>
              <Home />
            </AppProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute auth={user}>
            <AppProvider creator={user}>
              <Dashboard />
            </AppProvider>
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<PublicRoute auth={user} />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}
