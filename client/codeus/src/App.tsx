import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { initializeApp, getApps, getApp } from "firebase/app";
import Home from "./pages/home";
import Login from "./pages/login";

import { firebaseConfig } from "./firebase-config";
import { ProtectedRoute } from "./routes/protected-route";
import { IndexIfAuthenticatedRoute } from "./routes/authenticated-route";
import Register from "./pages/register";
import Profile from "./pages/profile";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <IndexIfAuthenticatedRoute>
              <Login />
            </IndexIfAuthenticatedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <IndexIfAuthenticatedRoute>
              <Register />
            </IndexIfAuthenticatedRoute>
          }
        />
        <Route
          path="/u/:handle"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
