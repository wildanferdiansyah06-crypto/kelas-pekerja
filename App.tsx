import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
