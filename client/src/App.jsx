import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from './components/PageNotFound';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProjectDetails from './pages/ProjectDetails';


export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </BrowserRouter>
  );
};

