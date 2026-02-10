"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ModuleSidebar from "@/components/learn/ModuleSidebar";
import ModuleContent from "@/components/learn/ModuleContent";
import { getModuleById } from "@/lib/modules-data";
import { useStore } from "@/store/useStore";

export default function LearnPage() {
  const { currentModule, setCurrentModule, completedModules, markModuleComplete, setUser, setActiveTab } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveTab("learn");
    fetch("/api/auth/me")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.user) setUser(data.user); })
      .catch(() => {});
    // Load saved progress
    fetch("/api/modules/progress")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.completedModules) {
          data.completedModules.forEach((id: number) => markModuleComplete(id));
        }
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const module = getModuleById(currentModule);

  function handleComplete() {
    markModuleComplete(currentModule);
    // Save to server
    fetch("/api/modules/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId: currentModule, sectionId: module?.sectionId, completed: true }),
    }).catch(() => {});
    // Auto-advance to next module
    if (currentModule < 59) {
      setCurrentModule(currentModule + 1);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex">
        {/* Mobile toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-4 left-4 z-50 bg-emerald-600 text-white p-3 rounded-full shadow-lg"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        {/* Sidebar */}
        <div className={`${sidebarOpen ? "block" : "hidden"} lg:block fixed lg:static z-40 inset-y-16 left-0`}>
          <ModuleSidebar
            currentModule={currentModule}
            completedModules={completedModules}
            onSelectModule={(id) => { setCurrentModule(id); setSidebarOpen(false); }}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          {module ? (
            <ModuleContent
              module={module}
              isCompleted={completedModules.has(currentModule)}
              onComplete={handleComplete}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">Module not found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
