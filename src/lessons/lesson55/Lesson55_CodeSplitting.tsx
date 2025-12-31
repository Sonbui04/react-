import { Suspense, lazy } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../lesson38/Lesson38_NestedState"));
const About = lazy(() => import("./Todos"));

export default function Lesson55_CodeSplitting() {
  return (
    <BrowserRouter>
      <div style={{ padding: 16 }}>
        <h3>Lesson55 - Code splitting </h3>

        <nav style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
         
        </nav>

        <Suspense fallback={<div>Loading route chunk...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
