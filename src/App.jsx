import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./auth/UserContext.jsx";
import Layout from "./components/layout/Layout.jsx";
import Users from "./components/views/Users.jsx";
import Events from "./components/views/Events.jsx";
import Home from "./components/views/Home.jsx";
import EventInfo from "./components/views/EventInfo.jsx";
import RegisterForm from "./auth/registerForm.jsx";
import LoginForm from "./auth/LoginForm.jsx";
import "./App.scss";
import Login from "./components/views/Login.jsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventInfo />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
