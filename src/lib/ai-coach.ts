import type { AICoachMessage } from "@/types";
import type { PositionData, TradingStats } from "@/types";
import { getQuote } from "./market-data";

export function analyzeTradeEntry(
  symbol: string,
  side: "buy" | "sell" | "short",
  quantity: number,
  entryPrice: number,
  stopLoss: number | undefined,
  takeProfit: number | undefined,
  accountValue: number,
  openPositions: number
): { messages: AICoachMessage[]; riskGrade: string; confidenceScore: number } {
  const messages: AICoachMessage[] = [];
  let confidenceScore = 7;
  const quote = getQuote(symbol);
  const timestamp = new Date().toISOString();

  // Risk per trade analysis
  if (stopLoss) {
    const riskPerShare = Math.abs(entryPrice - stopLoss);
    const totalRisk = riskPerShare * quantity;
    const riskPercent = (totalRisk / accountValue) * 100;

    if (riskPercent > 2) {
      messages.push({
        type: "warning",
        title: "High Risk Alert",
        message: `This trade risks ${riskPercent.toFixed(1)}% of your capital. The 1% rule suggests max ${(accountValue * 0.01).toFixed(0)} risk. Consider reducing position size.`,
        suggestions: ["Reduce quantity to lower risk", "Widen stop for fewer shares"],
        timestamp,
      });
      confidenceScore -= 2;
    } else if (riskPercent > 1) {
      messages.push({
        type: "info",
        title: "Risk Above 1%",
        message: `Risk is ${riskPercent.toFixed(2)}% of capital. Slightly above the 1% rule but manageable.`,
        timestamp,
      });
      confidenceScore -= 1;
    } else {
      messages.push({
        type: "celebration",
        title: "Excellent Risk Management",
        message: `Risk is only ${riskPercent.toFixed(2)}% of capital. Well within the 1% rule.`,
        timestamp,
      });
    }

    // R:R analysis
    if (takeProfit) {
      const rewardPerShare = Math.abs(takeProfit - entryPrice);
      const rr = rewardPerShare / riskPerShare;
      if (rr < 1.5) {
        messages.push({
          type: "warning",
          title: "Poor Risk/Reward",
          message: `R:R ratio is 1:${rr.toFixed(1)}. Minimum recommended is 1:1.5. Consider a wider target or tighter stop.`,
          suggestions: ["Increase take profit target", "Tighten stop loss"],
          timestamp,
        });
        confidenceScore -= 2;
      } else if (rr >= 2) {
        messages.push({
          type: "celebration",
          title: "Great Risk/Reward",
          message: `R:R ratio is 1:${rr.toFixed(1)}. Favorable setup.`,
          timestamp,
        });
        confidenceScore += 1;
      }
    }
  } else {
    messages.push({
      type: "alert",
      title: "No Stop Loss Set!",
      message: "Trading without a stop loss means UNLIMITED risk. This is extremely dangerous. Please set a stop loss.",
      suggestions: ["Set stop loss below recent support", "Use 1-2% from entry as minimum"],
      timestamp,
    });
    confidenceScore -= 3;
  }

  // Position count
  if (openPositions >= 5) {
    messages.push({
      type: "warning",
      title: "High Portfolio Heat",
      message: `You have ${openPositions} open positions. Adding more increases portfolio heat. Consider waiting for one to close.`,
      suggestions: ["Wait for a position to close", "Close a weaker position first"],
      timestamp,
    });
    confidenceScore -= 1;
  }

  // Technical context
  if (quote) {
    if (quote.changePercent > 5) {
      messages.push({
        type: "warning",
        title: "Extended Move",
        message: `${symbol} is up ${quote.changePercent.toFixed(1)}% today. Chasing extended moves increases risk. Consider waiting for a pullback.`,
        suggestions: ["Wait for pullback to support", "Reduce position size on extended moves"],
        timestamp,
      });
      confidenceScore -= 1;
    }
    if (quote.volume > quote.avgVolume * 1.5) {
      messages.push({
        type: "info",
        title: "Above Average Volume",
        message: `Volume is ${((quote.volume / quote.avgVolume) * 100).toFixed(0)}% of average. High volume confirms the move.`,
        timestamp,
      });
      confidenceScore += 1;
    }
  }

  confidenceScore = Math.max(1, Math.min(10, confidenceScore));

  let riskGrade = "A";
  if (confidenceScore >= 8) riskGrade = "A+";
  else if (confidenceScore >= 7) riskGrade = "A";
  else if (confidenceScore >= 6) riskGrade = "B+";
  else if (confidenceScore >= 5) riskGrade = "B";
  else if (confidenceScore >= 4) riskGrade = "C";
  else riskGrade = "D";

  return { messages, riskGrade, confidenceScore };
}

export function generatePositionCoaching(position: PositionData, accountValue: number): AICoachMessage | null {
  const pnlPercent = ((position.currentPrice - position.entryPrice) / position.entryPrice) * 100;
  const timestamp = new Date().toISOString();

  // Approaching take profit
  if (position.takeProfit) {
    const distToTarget = Math.abs(position.takeProfit - position.currentPrice);
    const totalTarget = Math.abs(position.takeProfit - position.entryPrice);
    if (distToTarget / totalTarget < 0.2 && pnlPercent > 0) {
      return {
        type: "coaching",
        title: `${position.symbol} - Approaching Target`,
        message: `Price is within 20% of your take profit target. Consider taking partial profits (50%) and trailing the rest.`,
        suggestions: ["Take 50% profit now", "Trail stop to breakeven", "Let it ride to target"],
        timestamp,
      };
    }
  }

  // Approaching stop loss
  if (position.stopLoss) {
    const distToStop = Math.abs(position.currentPrice - position.stopLoss);
    const totalStop = Math.abs(position.entryPrice - position.stopLoss);
    if (distToStop / totalStop < 0.3 && pnlPercent < 0) {
      return {
        type: "warning",
        title: `${position.symbol} - Near Stop Loss`,
        message: `Price is getting close to your stop. Remember: DO NOT move your stop farther. Let it do its job if triggered. A small loss is better than a big one.`,
        suggestions: ["Keep stop as-is", "Review if thesis is still valid"],
        timestamp,
      };
    }
  }

  // Position doing well
  if (pnlPercent > 2) {
    return {
      type: "info",
      title: `${position.symbol} - Looking Good`,
      message: `Up ${pnlPercent.toFixed(1)}% from entry. Consider trailing your stop to breakeven to lock in a risk-free trade.`,
      suggestions: ["Trail stop to breakeven", "Take partial profits", "Let it run"],
      timestamp,
    };
  }

  return null;
}

export function generateStatsCoaching(stats: TradingStats): AICoachMessage[] {
  const messages: AICoachMessage[] = [];
  const timestamp = new Date().toISOString();

  if (stats.totalTrades >= 10) {
    if (stats.winRate < 50) {
      messages.push({
        type: "coaching",
        title: "Win Rate Below 50%",
        message: `Your win rate is ${stats.winRate.toFixed(1)}%. Review your entry criteria - you may be entering too early or chasing moves. Focus on higher-quality setups.`,
        suggestions: ["Review last 10 losing trades", "Tighten entry criteria", "Wait for more confirmation"],
        timestamp,
      });
    }
    if (stats.profitFactor < 1.5) {
      messages.push({
        type: "warning",
        title: "Low Profit Factor",
        message: `Your profit factor is ${stats.profitFactor.toFixed(2)}. Aim for 2.0+. This means your winners need to be bigger relative to your losers.`,
        suggestions: ["Let winners run longer", "Cut losers faster", "Improve R:R on entries"],
        timestamp,
      });
    }
    if (stats.profitFactor > 2.5 && stats.winRate > 60) {
      messages.push({
        type: "celebration",
        title: "Outstanding Performance!",
        message: `${stats.winRate.toFixed(1)}% win rate with ${stats.profitFactor.toFixed(2)} profit factor. You're trading at a professional level. Keep following your rules!`,
        timestamp,
      });
    }
  }

  return messages;
}

export function getPostTradeAnalysis(
  pnl: number,
  pnlPercent: number,
  followedRules: boolean
): AICoachMessage {
  const timestamp = new Date().toISOString();

  if (pnl > 0 && followedRules) {
    return {
      type: "celebration",
      title: "Great Trade!",
      message: `+$${pnl.toFixed(2)} (${pnlPercent.toFixed(2)}%). You followed your rules and the market rewarded you. This is how consistent profitability is built.`,
      timestamp,
    };
  }
  if (pnl < 0 && followedRules) {
    return {
      type: "coaching",
      title: "Good Process, Tough Outcome",
      message: `You lost $${Math.abs(pnl).toFixed(2)} but followed your rules perfectly. This is a SUCCESSFUL trade from a process standpoint. Losses are part of trading - your job is to follow the system.`,
      suggestions: ["Journal this trade", "Take a short break", "Review what you can learn"],
      timestamp,
    };
  }
  if (pnl < 0 && !followedRules) {
    return {
      type: "alert",
      title: "Rules Broken - Learn From This",
      message: `Lost $${Math.abs(pnl).toFixed(2)} AND broke your rules. This is the type of trade that destroys accounts over time. What rule did you break? How can you prevent it next time?`,
      suggestions: ["Write down which rule was broken", "Set a reminder for next time", "Review your strategy rules"],
      timestamp,
    };
  }
  return {
    type: "info",
    title: "Trade Closed",
    message: `+$${pnl.toFixed(2)} (${pnlPercent.toFixed(2)}%). Remember to journal this trade and note any deviations from your plan.`,
    timestamp,
  };
}
