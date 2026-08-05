"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="lg:ml-72 min-h-screen flex flex-col">
        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}