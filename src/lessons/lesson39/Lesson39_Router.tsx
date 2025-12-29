import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Todos from "./Todos";
import About from "./About";

export default function Lesson39_Router() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
