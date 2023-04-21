import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Preferences";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferences" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
