"use client";

import { create } from "zustand";
import type { UserProfile, PortfolioSummary, PositionData, TradeData, TradingStats, AICoachMessage } from "@/types";

interface AppState {
  // Auth
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;

  // Portfolio
  portfolio: PortfolioSummary | null;
  setPortfolio: (portfolio: PortfolioSummary | null) => void;

  // Active tab
  activeTab: "learn" | "practice" | "create";
  setActiveTab: (tab: "learn" | "practice" | "create") => void;

  // Learn
  currentModule: number;
  setCurrentModule: (moduleId: number) => void;
  completedModules: Set<number>;
  markModuleComplete: (moduleId: number) => void;

  // Practice
  selectedSymbol: string | null;
  setSelectedSymbol: (symbol: string | null) => void;
  showOrderForm: boolean;
  setShowOrderForm: (show: boolean) => void;

  // Trades
  trades: TradeData[];
  setTrades: (trades: TradeData[]) => void;
  stats: TradingStats | null;
  setStats: (stats: TradingStats | null) => void;

  // AI Coach
  coachMessages: AICoachMessage[];
  addCoachMessage: (message: AICoachMessage) => void;
  dismissCoachMessage: (index: number) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // Portfolio
  portfolio: null,
  setPortfolio: (portfolio) => set({ portfolio }),

  // Active tab
  activeTab: "learn",
  setActiveTab: (activeTab) => set({ activeTab }),

  // Learn
  currentModule: 1,
  setCurrentModule: (currentModule) => set({ currentModule }),
  completedModules: new Set<number>(),
  markModuleComplete: (moduleId) =>
    set((state) => ({
      completedModules: new Set([...state.completedModules, moduleId]),
    })),

  // Practice
  selectedSymbol: null,
  setSelectedSymbol: (selectedSymbol) => set({ selectedSymbol }),
  showOrderForm: false,
  setShowOrderForm: (showOrderForm) => set({ showOrderForm }),

  // Trades
  trades: [],
  setTrades: (trades) => set({ trades }),
  stats: null,
  setStats: (stats) => set({ stats }),

  // AI Coach
  coachMessages: [],
  addCoachMessage: (message) =>
    set((state) => ({
      coachMessages: [message, ...state.coachMessages].slice(0, 20),
    })),
  dismissCoachMessage: (index) =>
    set((state) => ({
      coachMessages: state.coachMessages.filter((_, i) => i !== index),
    })),

  // UI
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
