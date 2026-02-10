"use client";

import { SECTIONS, getModulesBySection } from "@/lib/modules-data";

interface ModuleSidebarProps {
  currentModule: number;
  completedModules: Set<number>;
  onSelectModule: (id: number) => void;
}

export default function ModuleSidebar({ currentModule, completedModules, onSelectModule }: ModuleSidebarProps) {
  return (
    <div className="w-full lg:w-80 bg-gray-900 border-r border-gray-800 overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="p-4">
        <h2 className="text-lg font-bold text-white mb-1">Curriculum</h2>
        <p className="text-sm text-gray-400 mb-4">
          {completedModules.size} of 59 modules completed
        </p>

        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedModules.size / 59) * 100}%` }}
          />
        </div>

        <div className="space-y-4">
          {SECTIONS.map((section) => {
            const modules = getModulesBySection(section.id);
            const completedCount = modules.filter((m) => completedModules.has(m.id)).length;

            return (
              <div key={section.id}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-300">
                    <span className="mr-1.5">{section.icon}</span>
                    {section.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {completedCount}/{modules.length}
                  </span>
                </div>

                <div className="space-y-0.5">
                  {modules.map((mod) => {
                    const isActive = mod.id === currentModule;
                    const isDone = completedModules.has(mod.id);

                    return (
                      <button
                        key={mod.id}
                        onClick={() => onSelectModule(mod.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          isActive
                            ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                            : isDone
                            ? "text-gray-400 hover:bg-gray-800"
                            : "text-gray-500 hover:bg-gray-800 hover:text-gray-300"
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                          isDone
                            ? "bg-emerald-600 text-white"
                            : isActive
                            ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500"
                            : "bg-gray-700 text-gray-500"
                        }`}>
                          {isDone ? "✓" : mod.id}
                        </span>
                        <span className="truncate">{mod.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
