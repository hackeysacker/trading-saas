import type { Achievement } from "@/types";

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_blood", name: "First Blood", description: "Complete your first profitable trade", icon: "🩸", category: "trading", requirement: "1 profitable trade", isUnlocked: false },
  { id: "ten_trades", name: "10 Trades", description: "Complete 10 trades", icon: "🔟", category: "trading", requirement: "10 total trades", isUnlocked: false, progress: 0, target: 10 },
  { id: "first_green_day", name: "First Green Day", description: "Your first profitable trading day", icon: "💚", category: "trading", requirement: "1 profitable day", isUnlocked: false },
  { id: "five_streak", name: "5-Win Streak", description: "Win 5 trades in a row", icon: "🔥", category: "trading", requirement: "5 consecutive wins", isUnlocked: false, progress: 0, target: 5 },
  { id: "risk_master_20", name: "Risk Master", description: "Complete 20 trades with under 1% risk each", icon: "🛡️", category: "risk", requirement: "20 trades under 1% risk", isUnlocked: false, progress: 0, target: 20 },
  { id: "profit_1k", name: "$1K Profit", description: "Reach $1,000 in total profit", icon: "💰", category: "profit", requirement: "$1,000 total P&L", isUnlocked: false, progress: 0, target: 1000 },
  { id: "week_survivor", name: "Week 1 Survivor", description: "End your first week with positive P&L", icon: "🏕️", category: "milestone", requirement: "Positive after 7 days", isUnlocked: false },
  { id: "twenty_five_trades", name: "25 Trades", description: "Complete 25 trades", icon: "📊", category: "trading", requirement: "25 total trades", isUnlocked: false, progress: 0, target: 25 },
  { id: "profit_5k", name: "$5K Profit", description: "Reach $5,000 in total profit", icon: "💵", category: "profit", requirement: "$5,000 total P&L", isUnlocked: false, progress: 0, target: 5000 },
  { id: "ten_streak", name: "10-Win Streak", description: "Win 10 trades in a row", icon: "🔥🔥", category: "trading", requirement: "10 consecutive wins", isUnlocked: false, progress: 0, target: 10 },
  { id: "thirty_day_survivor", name: "30-Day Survivor", description: "Trade for 30 days and stay profitable", icon: "🏆", category: "milestone", requirement: "Positive after 30 days", isUnlocked: false, progress: 0, target: 30 },
  { id: "win_rate_70", name: "70% Win Rate", description: "Achieve 70% win rate over 20+ trades", icon: "🎯", category: "performance", requirement: "70% win rate (20+ trades)", isUnlocked: false },
  { id: "profit_factor_3", name: "Profit Factor 3.0", description: "Achieve profit factor of 3.0 or higher", icon: "📈", category: "performance", requirement: "Profit factor ≥ 3.0", isUnlocked: false },
  { id: "hundred_trades", name: "100 Trades", description: "Complete 100 trades", icon: "💯", category: "trading", requirement: "100 total trades", isUnlocked: false, progress: 0, target: 100 },
  { id: "profit_10k", name: "$10K Profit", description: "Reach $10,000 total profit", icon: "🤑", category: "profit", requirement: "$10,000 total P&L", isUnlocked: false, progress: 0, target: 10000 },
  { id: "profit_25k", name: "$25K Profit", description: "Reach $25,000 total profit", icon: "💎", category: "profit", requirement: "$25,000 total P&L", isUnlocked: false, progress: 0, target: 25000 },
  { id: "top_25", name: "Top 25", description: "Reach top 25 on leaderboard", icon: "🏅", category: "leaderboard", requirement: "Top 25 rank", isUnlocked: false },
  { id: "top_10", name: "Top 10", description: "Reach top 10 on leaderboard", icon: "🥇", category: "leaderboard", requirement: "Top 10 rank", isUnlocked: false },
  { id: "perfect_week", name: "Perfect Week", description: "5 trading days, all profitable", icon: "⭐", category: "milestone", requirement: "5 consecutive green days", isUnlocked: false },
  { id: "risk_ninja", name: "Risk Ninja", description: "100 trades, never risking more than 1%", icon: "🥷", category: "risk", requirement: "100 trades, all under 1% risk", isUnlocked: false, progress: 0, target: 100 },
  { id: "module_master", name: "Module Master", description: "Complete all 59 learning modules", icon: "🎓", category: "learning", requirement: "59/59 modules completed", isUnlocked: false, progress: 0, target: 59 },
  { id: "first_strategy", name: "Strategy Creator", description: "Build your first trading strategy", icon: "🔧", category: "strategy", requirement: "Create 1 strategy", isUnlocked: false },
  { id: "diamond_hands", name: "Diamond Hands", description: "Hold a winning trade for 14+ days", icon: "💎🙌", category: "trading", requirement: "14+ day winning hold", isUnlocked: false },
  { id: "journal_10", name: "Journaling Pro", description: "Write 10 journal entries", icon: "📝", category: "learning", requirement: "10 journal entries", isUnlocked: false, progress: 0, target: 10 },
];

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function getAchievementsByCategory(category: string): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.category === category);
}
