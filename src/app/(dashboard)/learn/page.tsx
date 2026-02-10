"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ModuleSidebar from "@/components/learn/ModuleSidebar";
import ModuleContent from "@/components/learn/ModuleContent";
import { getModuleById } from "@/lib/modules-data";
import { useStore } from "@/store/useStore";
import { useAutoLogin } from "@/hooks/useAutoLogin";

export default function LearnPage() {
  const { currentModule, setCurrentModule, completedModules, markModuleComplete, setActiveTab } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loaded = useAutoLogin();

  useEffect(() => {
    setActiveTab("learn");
  }, [setActiveTab]);

  useEffect(() => {
    if (!loaded) return;
    fetch("/api/modules/progress")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.completedModules) {
          data.completedModules.forEach((id: number) => markModuleComplete(id));
        }
      })
      .catch(() => {});
  }, [loaded, markModuleComplete]);

  const module = getModuleById(currentModule);

  function handleComplete() {
    markModuleComplete(currentModule);
    fetch("/api/modules/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId: currentModule, sectionId: module?.sectionId, completed: true }),
    }).catch(() => {});
    if (currentModule < 59) {
      setCurrentModule(currentModule + 1);
    }
  }

  if (!loaded) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-4 left-4 z-50 bg-emerald-600 text-white p-3 rounded-full shadow-lg"
        >
          {sidebarOpen ? "\u2715" : "\u2630"}
        </button>

        <div className={`${sidebarOpen ? "block" : "hidden"} lg:block fixed lg:static z-40 inset-y-16 left-0`}>
          <ModuleSidebar
            currentModule={currentModule}
            completedModules={completedModules}
            onSelectModule={(id) => { setCurrentModule(id); setSidebarOpen(false); }}
          />
        </div>

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
