import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Employees from './components/views/Employees.jsx';
import Events from './components/views/Events.jsx';
import Home from './components/views/Home.jsx';
import './App.scss';

function App() {
  const loggedInUser = 'Markos';

  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>

          <Route path="/" element={<Home />}/>
          <Route path="/modules" element={<Events />}/>
          <Route path="/students" element={<Employees />}/>

        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
