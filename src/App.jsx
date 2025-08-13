import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Employees from "./components/views/Employees.jsx";
import Events from "./components/views/Events.jsx";
import Home from "./components/views/Home.jsx";
import EventInfo from "./components/views/EventInfo.jsx";
import "./App.scss";
import Login from "./components/views/Login.jsx";
import { UserProvider } from "./auth/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventInfo />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
