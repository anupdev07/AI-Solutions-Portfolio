// client/src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import AdminPanel from "../pages/AdminPanel";
import BlogList from "../pages/BlogList";
import BlogDetail from "../pages/BlogDetail";



export default function AppRoutes() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  return (
    <Routes>
      {/* Admin standalone route */}
      <Route
        path="/admin/*"
        element={
          user && user.role === "admin" ? (
            <AdminPanel/>
          ) : (
            // logout user and navigate to login
            localStorage.removeItem("token") || localStorage.removeItem("user") ||
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public site routes (with App layout + navbar) */}
      <Route path="/*" element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="services" element={<Services />} />
        
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
       
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
         <Route path="blog" element={<BlogList />} />
      </Route>
       
        <Route path="/blog/:slug" element={<BlogDetail />} />
    </Routes>
  );
}
