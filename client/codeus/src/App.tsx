import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp, getApps, getApp } from "firebase/app";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { firebaseConfig } from "./firebase-config";
import { ProtectedRoute } from "./routes/protected-route";
import { IndexIfAuthenticatedRoute } from "./routes/authenticated-route";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
