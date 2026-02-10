// Simulated market data for MVP - In production, replace with real API calls
// (Polygon.io, Alpha Vantage, Binance WebSocket, etc.)

export interface MarketQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  avgVolume: number;
  bid: number;
  ask: number;
  assetType: "stock" | "crypto";
}

// Base prices for simulation - close to realistic values
const BASE_PRICES: Record<string, { name: string; price: number; type: "stock" | "crypto" }> = {
  AAPL: { name: "Apple Inc.", price: 182.50, type: "stock" },
  MSFT: { name: "Microsoft Corp.", price: 415.20, type: "stock" },
  GOOGL: { name: "Alphabet Inc.", price: 141.80, type: "stock" },
  AMZN: { name: "Amazon.com Inc.", price: 178.30, type: "stock" },
  NVDA: { name: "NVIDIA Corp.", price: 495.30, type: "stock" },
  META: { name: "Meta Platforms", price: 485.60, type: "stock" },
  TSLA: { name: "Tesla Inc.", price: 205.40, type: "stock" },
  AMD: { name: "Advanced Micro Devices", price: 172.80, type: "stock" },
  NFLX: { name: "Netflix Inc.", price: 598.40, type: "stock" },
  CRM: { name: "Salesforce Inc.", price: 274.50, type: "stock" },
  JPM: { name: "JPMorgan Chase", price: 195.20, type: "stock" },
  BAC: { name: "Bank of America", price: 35.80, type: "stock" },
  GS: { name: "Goldman Sachs", price: 398.70, type: "stock" },
  V: { name: "Visa Inc.", price: 278.90, type: "stock" },
  WMT: { name: "Walmart Inc.", price: 168.30, type: "stock" },
  NKE: { name: "Nike Inc.", price: 108.20, type: "stock" },
  SBUX: { name: "Starbucks Corp.", price: 97.40, type: "stock" },
  HD: { name: "Home Depot", price: 362.10, type: "stock" },
  "BTC/USD": { name: "Bitcoin", price: 44120.00, type: "crypto" },
  "ETH/USD": { name: "Ethereum", price: 2580.00, type: "crypto" },
  "BNB/USD": { name: "Binance Coin", price: 312.40, type: "crypto" },
  "SOL/USD": { name: "Solana", price: 98.50, type: "crypto" },
  "XRP/USD": { name: "Ripple", price: 0.62, type: "crypto" },
  "AVAX/USD": { name: "Avalanche", price: 35.20, type: "crypto" },
  "MATIC/USD": { name: "Polygon", price: 0.89, type: "crypto" },
  "LINK/USD": { name: "Chainlink", price: 15.40, type: "crypto" },
  "DOT/USD": { name: "Polkadot", price: 7.80, type: "crypto" },
  "ADA/USD": { name: "Cardano", price: 0.58, type: "crypto" },
};

// Deterministic but varying price simulation based on time
function getSimulatedVariance(symbol: string, timestamp?: number): number {
  const t = timestamp || Date.now();
  const seed = symbol.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const factor1 = Math.sin(t / 60000 + seed) * 0.015;
  const factor2 = Math.sin(t / 300000 + seed * 2) * 0.008;
  const factor3 = Math.cos(t / 900000 + seed * 3) * 0.005;
  return factor1 + factor2 + factor3;
}

export function getQuote(symbol: string): MarketQuote | null {
  const base = BASE_PRICES[symbol];
  if (!base) return null;

  const variance = getSimulatedVariance(symbol);
  const price = Number((base.price * (1 + variance)).toFixed(2));
  const change = Number((price - base.price).toFixed(2));
  const changePercent = Number(((change / base.price) * 100).toFixed(2));
  const spread = base.type === "crypto" ? price * 0.0005 : price * 0.0002;

  return {
    symbol,
    name: base.name,
    price,
    change,
    changePercent,
    high: Number((price * 1.012).toFixed(2)),
    low: Number((price * 0.988).toFixed(2)),
    open: base.price,
    volume: Math.floor(30000000 + Math.random() * 20000000),
    avgVolume: 35000000,
    bid: Number((price - spread / 2).toFixed(2)),
    ask: Number((price + spread / 2).toFixed(2)),
    assetType: base.type,
  };
}

export function getAllQuotes(): MarketQuote[] {
  return Object.keys(BASE_PRICES).map((symbol) => getQuote(symbol)!);
}

export function getStockQuotes(): MarketQuote[] {
  return getAllQuotes().filter((q) => q.assetType === "stock");
}

export function getCryptoQuotes(): MarketQuote[] {
  return getAllQuotes().filter((q) => q.assetType === "crypto");
}

export function getSymbolList(): string[] {
  return Object.keys(BASE_PRICES);
}

// Generate simulated historical candle data
export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function getHistoricalCandles(symbol: string, days: number = 90): CandleData[] {
  const base = BASE_PRICES[symbol];
  if (!base) return [];

  const candles: CandleData[] = [];
  let currentPrice = base.price * 0.85; // Start lower to show growth
  const now = Date.now();
  const dayMs = 86400000;

  for (let i = days; i >= 0; i--) {
    const time = now - i * dayMs;
    const dailyVariance = getSimulatedVariance(symbol, time);
    const trend = (days - i) / days * 0.18; // gentle uptrend

    const open = currentPrice;
    const volatility = base.type === "crypto" ? 0.04 : 0.02;
    const movement = (Math.sin(time / dayMs + symbol.length) * volatility + trend * 0.002);
    const close = Number((open * (1 + movement)).toFixed(2));
    const high = Number((Math.max(open, close) * (1 + Math.abs(dailyVariance) * 0.5)).toFixed(2));
    const low = Number((Math.min(open, close) * (1 - Math.abs(dailyVariance) * 0.5)).toFixed(2));

    candles.push({
      time: Math.floor(time / 1000),
      open: Number(open.toFixed(2)),
      high,
      low,
      close,
      volume: Math.floor(20000000 + Math.random() * 30000000),
    });

    currentPrice = close;
  }

  return candles;
}
