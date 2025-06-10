// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
