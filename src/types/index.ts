export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  tradingStyle: string | null;
  experienceLevel: string;
  createdAt: string;
}

export interface PortfolioSummary {
  startingCapital: number;
  cashBalance: number;
  totalValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  todayPnl: number;
  weekPnl: number;
  monthPnl: number;
  bestDay: number;
  worstDay: number;
  maxDrawdown: number;
  positions: PositionData[];
}

export interface PositionData {
  id: string;
  symbol: string;
  assetType: string;
  side: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number | null;
  takeProfit: number | null;
  unrealizedPnl: number;
  strategy: string | null;
  openedAt: string;
}

export interface TradeData {
  id: string;
  symbol: string;
  assetType: string;
  side: string;
  entryPrice: number;
  exitPrice: number | null;
  quantity: number;
  stopLoss: number | null;
  takeProfit: number | null;
  pnl: number | null;
  pnlPercent: number | null;
  riskReward: number | null;
  strategy: string | null;
  status: string;
  holdTime: number | null;
  emotionEntry: string | null;
  emotionExit: string | null;
  openedAt: string;
  closedAt: string | null;
}

export interface TradingStats {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  avgWinner: number;
  avgLoser: number;
  largestWin: number;
  largestLoss: number;
  profitFactor: number;
  avgHoldTime: number;
  bestStrategy: string;
  worstStrategy: string;
}

export interface ModuleData {
  id: number;
  sectionId: number;
  sectionTitle: string;
  title: string;
  description: string;
  content: string[];
  keyPoints: string[];
  quiz?: QuizQuestion[];
  practiceExercise?: string;
  estimatedTime: number; // minutes
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  displayName: string | null;
  totalPnl: number;
  pnlPercent: number;
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  tradingStyle: string | null;
  streak: number;
  isCurrentUser?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

export interface StrategyConfig {
  name: string;
  description: string;
  tradingStyle: string;
  timeCommitment: string;
  assets: string[];
  personality: string;
  experienceLevel: string;
  goal: string;
  trendFilters: string[];
  entryRules: string[];
  positionSizing: {
    riskPercent: number;
    maxPositionPercent: number;
  };
  stopLossRules: string[];
  takeProfitRules: string[];
  additionalFilters: string[];
}

export interface OrderRequest {
  symbol: string;
  side: "buy" | "sell" | "short";
  orderType: "market" | "limit" | "stop" | "stop_limit";
  quantity: number;
  limitPrice?: number;
  stopPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  strategy?: string;
  timeInForce: "day" | "gtc" | "ioc";
}

export interface AICoachMessage {
  type: "info" | "warning" | "alert" | "coaching" | "celebration";
  title: string;
  message: string;
  suggestions?: string[];
  timestamp: string;
}
