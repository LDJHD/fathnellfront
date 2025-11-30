import React from "react";
import Sidebar from "../pages/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet /> {/* <-- C'est ici que les routes filles seront affichées */}
      </div>
    </div>
  );
}
