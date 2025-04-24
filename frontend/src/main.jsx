import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import Login from "./Login";
import RegisterPage from "./RegisterPage";
import RegisterPageAlumno from "./RegisterPageAlumno";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-tutor" element={<RegisterPage />} />
        <Route path="/tutores" element={<App />} />
        <Route path="/register-alumno" element={<RegisterPageAlumno />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// ✅ Registro del Service Worker (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}