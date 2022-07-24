import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetProfilePicture from "./components/SetProfilePicture";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setProfilePicture" element={<SetProfilePicture />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
