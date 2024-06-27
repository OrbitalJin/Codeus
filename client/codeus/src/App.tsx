import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

import { ProtectedRoute } from "./routes/protected-route";
import { IndexIfAuthenticatedRoute } from "./routes/authenticated-route";
import Register from "./pages/register";
import Profile from "./pages/profile";
import BookMarks from "./pages/bookmarks";
import Post from "./pages/post";
import RoutesWrapper from "./routes/routes-wrapper";
import Threads from "./pages/threads";
import ThreadPage from "./pages/thread";
import { app } from "./lib/firebase";

const instance = app;

function App() {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
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
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <BookMarks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/threads"
            element={
              <ProtectedRoute>
                <Threads />
              </ProtectedRoute>
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
          <Route
            path="/@/:threadId"
            element={
              <ProtectedRoute>
                <ThreadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/p/:postId"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
        </Routes>
      </RoutesWrapper>
    </BrowserRouter>
  );
}

export default App;
