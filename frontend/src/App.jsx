import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Analyze from "./pages/analyze/Analyze";
import Results from "./pages/results/Results";
import About from "./pages/about/About";
import Layout from "./components/common/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="analyze" element={<Analyze />} />
        <Route path="results" element={<Results />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
