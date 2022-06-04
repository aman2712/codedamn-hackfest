import { Routes, Route } from "react-router-dom";

import { Home, Login, Register, Logout, CreatePost } from "./pages";
import { Navbar } from "./components";
import { AuthProvider, PostsProvider } from "./context";
import { ProtectedRoutes, NotLoggedInRoutes } from "./utils";

function App() {

  return (
    <AuthProvider>
      <PostsProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/create" element={<CreatePost />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route element={<NotLoggedInRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </div>
      </PostsProvider>
    </AuthProvider>
  )
}

export default App
