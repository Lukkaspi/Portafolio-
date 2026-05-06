import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Project from './pages/Project.jsx';
import NotFound from './pages/NotFound.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
