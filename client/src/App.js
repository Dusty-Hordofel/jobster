import { Landing, Error, Dasboard, Register } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Dasboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
