import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Home";
import Rak from "./Rak";
import Reader from "./Reader";

export default function App() {

return (

<Router>

  <Routes>

    <Route path="/" element={<HomePage />} />

    <Route path="/rak" element={<Rak />} />

    <Route path="/buku/:id" element={<Reader />} />

  </Routes>

</Router>

);

}
