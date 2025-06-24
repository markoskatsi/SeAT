import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Employees from "./components/views/Employees.jsx";
import Events from "./components/views/Events.jsx";
import Home from "./components/views/Home.jsx";
import "./App.scss";
import Login from "./components/views/Login.jsx";
import { AuthProvider } from "./auth/useAuth.jsx";

function App() {
  const loggedInUser = "Markos";

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout loggedInUser={loggedInUser}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
