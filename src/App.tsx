import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function App() {
  gsap.registerPlugin(ScrollTrigger);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
