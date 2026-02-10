import type { ModuleData } from "@/types";

export const SECTIONS = [
  { id: 1, title: "Trading Fundamentals", moduleRange: [1, 8], icon: "📚" },
  { id: 2, title: "Technical Analysis", moduleRange: [9, 18], icon: "📊" },
  { id: 3, title: "Fundamental Analysis", moduleRange: [19, 24], icon: "📰" },
  { id: 4, title: "Trading Strategies", moduleRange: [25, 36], icon: "🎯" },
  { id: 5, title: "Trading Psychology", moduleRange: [37, 44], icon: "🧠" },
  { id: 6, title: "Risk Management", moduleRange: [45, 51], icon: "🛡️" },
  { id: 7, title: "Advanced Concepts", moduleRange: [52, 59], icon: "🚀" },
];

export const MODULES: ModuleData[] = [
  {
    id: 1, sectionId: 1, sectionTitle: "Trading Fundamentals",
    title: "Markets 101 - How Trading Actually Works",
    description: "Learn what stocks and crypto are, how exchanges work, and how prices are determined.",
    estimatedTime: 15,
    content: [
      "A stock represents ownership in a company. When you buy a share of Apple (AAPL), you literally own a tiny piece of Apple Inc. Cryptocurrency is a digital asset that uses blockchain technology - Bitcoin (BTC) was the first, created in 2009.",
      "Exchanges are marketplaces where buyers and sellers meet. The NYSE and NASDAQ handle stocks; Binance and Coinbase handle crypto. Think of them like eBay for financial assets - they match buyers with sellers.",
      "Market participants include retail traders (individuals like you), institutional investors (hedge funds, banks), and market makers (firms that provide liquidity by always being willing to buy and sell).",
      "Prices are determined by supply and demand. If more people want to buy AAPL than sell it, the price goes up. If more people want to sell, the price goes down. It's that simple at its core.",
      "Liquidity refers to how easily you can buy or sell without affecting the price. Apple has high liquidity (millions of shares traded daily). A small crypto token might have low liquidity (hard to buy/sell large amounts)."
    ],
    keyPoints: [
      "Stocks = ownership in companies; Crypto = digital assets on blockchain",
      "Exchanges match buyers with sellers",
      "Prices are driven by supply and demand",
      "Liquidity determines how easily you can trade"
    ],
    quiz: [
      { question: "What does a stock represent?", options: ["A loan to a company", "Ownership in a company", "A promise of future payment", "A government bond"], correctAnswer: 1, explanation: "A stock represents partial ownership in a company. When you buy shares, you become a shareholder." },
      { question: "What determines the price of a stock?", options: ["The CEO decides", "The government sets it", "Supply and demand", "A fixed formula"], correctAnswer: 2, explanation: "Prices are determined by supply (sellers) and demand (buyers) in the market." },
      { question: "What is liquidity?", options: ["How much cash a company has", "How easily an asset can be bought or sold", "The total value of an exchange", "The spread between buy and sell prices"], correctAnswer: 1, explanation: "Liquidity refers to how easily you can buy or sell an asset without significantly affecting its price." }
    ]
  },
  {
    id: 2, sectionId: 1, sectionTitle: "Trading Fundamentals",
    title: "Order Types Explained",
    description: "Master market orders, limit orders, stop-losses, and more.",
    estimatedTime: 20,
    content: [
      "A Market Order executes immediately at the current best price. You get instant execution but no price guarantee. Use when speed matters more than price.",
      "A Limit Order lets you set your price. 'Buy AAPL at $180' means you'll only buy at $180 or lower. You control the price but the order might not fill if the price never reaches your level.",
      "A Stop-Loss Order automatically sells when price hits your stop level. Set a stop at $175 on your $180 AAPL position, and it auto-sells if price drops to $175, limiting your loss to $5 per share.",
      "A Take-Profit Order automatically sells when price hits your target. Set a take-profit at $190 on your $180 entry, and it auto-sells when price reaches $190, locking in $10 profit per share.",
      "A Stop-Limit Order combines a stop trigger with a limit price. When the stop is hit, a limit order is placed instead of a market order. More price control but risk of not filling.",
      "OCO (One-Cancels-Other) combines stop-loss and take-profit. When one triggers, the other is automatically cancelled. This is how pros manage trades - set it and forget it."
    ],
    keyPoints: [
      "Market orders = instant execution, no price guarantee",
      "Limit orders = price control, no execution guarantee",
      "Stop-loss = automatic risk management (mandatory!)",
      "Take-profit = automatic profit locking",
      "OCO = stop-loss + take-profit combined"
    ],
    quiz: [
      { question: "Which order type guarantees execution but not price?", options: ["Limit order", "Market order", "Stop-limit order", "OCO order"], correctAnswer: 1, explanation: "Market orders execute immediately at the best available price, guaranteeing execution but not the exact price." },
      { question: "What does a stop-loss order do?", options: ["Buys more when price drops", "Automatically sells at a predetermined loss level", "Guarantees profit on every trade", "Cancels all other orders"], correctAnswer: 1, explanation: "A stop-loss automatically exits your position when price hits your predetermined loss level, limiting downside risk." }
    ]
  },
  {
    id: 3, sectionId: 1, sectionTitle: "Trading Fundamentals",
    title: "Reading Price Charts",
    description: "Understand candlesticks, timeframes, and volume.",
    estimatedTime: 20,
    content: [
      "Candlesticks are the language of price charts. Each candle shows four prices: Open (where price started), High (highest point), Low (lowest point), and Close (where price ended).",
      "A green/bullish candle means the close was higher than the open (price went up). A red/bearish candle means the close was lower than the open (price went down).",
      "The body of the candle shows the range between open and close. The wicks (thin lines above and below) show the high and low. Long wicks indicate rejection of those price levels.",
      "Timeframes range from 1-minute charts (each candle = 1 minute) to monthly charts (each candle = 1 month). Day traders use 1-minute to 1-hour. Swing traders use 4-hour to daily. Investors use weekly to monthly.",
      "Volume bars appear below the price chart and show how many shares/coins were traded. High volume confirms price moves. Low volume suggests weak moves that might reverse."
    ],
    keyPoints: [
      "Candlesticks show Open, High, Low, Close (OHLC)",
      "Green = bullish (up), Red = bearish (down)",
      "Wicks show price rejection at extremes",
      "Volume confirms the strength of price moves"
    ],
    quiz: [
      { question: "What does a long upper wick on a candle indicate?", options: ["Strong buying pressure", "Price was rejected at higher levels", "The market is closed", "Volume is increasing"], correctAnswer: 1, explanation: "A long upper wick means price reached up but was rejected, with sellers pushing it back down. This shows selling pressure at those higher levels." },
      { question: "What does high volume on a price move suggest?", options: ["The move is weak", "The move is strong and confirmed", "The market is about to close", "Nothing useful"], correctAnswer: 1, explanation: "High volume confirms that many participants support the price move, making it more likely to continue." }
    ]
  },
  {
    id: 4, sectionId: 1, sectionTitle: "Trading Fundamentals",
    title: "Market Mechanics - The Hidden Rules",
    description: "Understand bid-ask spreads, slippage, liquidity, and market hours.",
    estimatedTime: 15,
    content: [
      "The bid-ask spread is the difference between the highest price a buyer will pay (bid) and the lowest price a seller will accept (ask). For AAPL, the bid might be $182.48 and the ask $182.52 - a $0.04 spread.",
      "Every time you buy at market price, you pay the ask. When you sell, you get the bid. The spread is a hidden cost on every trade. Tight spreads (liquid assets) cost less; wide spreads (illiquid assets) cost more.",
      "Slippage occurs when your order executes at a different price than expected. In fast-moving markets, the price can move between when you click 'buy' and when it fills. This is why limit orders are safer.",
      "Market hours for US stocks: Regular session 9:30 AM - 4:00 PM ET. Pre-market: 4:00 AM - 9:30 AM. After-hours: 4:00 PM - 8:00 PM. Crypto trades 24/7 but has activity patterns.",
      "Gap ups and gap downs occur when price opens significantly higher or lower than the previous close. This happens with overnight news, earnings reports, or weekend events (especially crypto)."
    ],
    keyPoints: [
      "Bid-ask spread is a hidden cost on every trade",
      "Slippage means worse execution in fast markets",
      "Stocks have fixed hours; crypto is 24/7",
      "Gaps happen when news hits outside market hours"
    ],
    quiz: [
      { question: "What is the bid-ask spread?", options: ["The daily price range", "The difference between highest buyer and lowest seller", "The commission you pay", "The overnight price change"], correctAnswer: 1, explanation: "The bid-ask spread is the gap between what buyers will pay (bid) and what sellers want (ask). It's a cost you pay on every trade." }
    ]
  },
  {
    id: 5, sectionId: 1, sectionTitle: "Trading Fundamentals",
    title: "Trading Timeframes - Finding Your Style",
    description: "Discover whether scalping, day trading, swing trading, or position trading suits you.",
    estimatedTime: 15,
    content: [
      "Scalping means holding positions for seconds to minutes. Scalpers make many small trades per day, targeting tiny price movements. It's high stress, requires fast execution, and is NOT recommended for beginners.",
      "Day Trading means opening and closing all positions within the same day. No overnight risk. Requires 2-6 hours of active screen time. Most common style for active traders.",
      "Swing Trading means holding positions for days to weeks, capturing larger price moves. Requires just 30-60 minutes per day to review charts. Best for people with day jobs.",
      "Position Trading means holding for weeks to months, following major trends. Requires minimal daily attention. Closest to investing but with active risk management.",
      "Your personality matters: Patient people thrive at swing trading. Adrenaline seekers gravitate to scalping (but often lose). Analytical types do well with position trading. There's no 'best' style - only the best style for YOU."
    ],
    keyPoints: [
      "Scalping: seconds-minutes, high stress, not for beginners",
      "Day trading: minutes-hours, close everything by end of day",
      "Swing trading: days-weeks, best for people with day jobs",
      "Position trading: weeks-months, minimal daily attention"
    ],
    quiz: [
      { question: "Which trading style is best for someone with a full-time job?", options: ["Scalping", "Day trading", "Swing trading", "All are equal"], correctAnswer: 2, explanation: "Swing trading requires only 30-60 minutes per day to review charts and manage positions, making it ideal for people with day jobs." }
    ]
  },
  {
    id: 6, sectionId: 1, sectionTitle: "Trading Fundamentals",
    title: "Position Sizing - How Much to Trade",
    description: "Learn the 1% rule and how to calculate proper position sizes.",
    estimatedTime: 15,
    content: [
      "Position sizing is the most important concept in trading that nobody talks about. It determines how much of your capital to risk on each trade. Get this wrong and even a winning strategy will blow up your account.",
      "The 1% Rule: Never risk more than 1% of your total account on a single trade. With a $100,000 account, your maximum risk per trade is $1,000.",
      "This doesn't mean your position size is 1% of your account. It means your potential LOSS if stopped out should be 1%. If your stop loss is 2% away from entry, your position can be 50% of your account and still only risk 1%.",
      "Position Size Formula: (Account Size × Risk %) / Stop Loss Distance = Number of Shares. Example: ($100,000 × 1%) / $2.00 stop = 500 shares.",
      "Why 1%? Because even with 10 losing trades in a row (which happens), you're only down 10%. You can recover. At 5% risk per trade, 10 losses puts you down 50% - you need 100% gains just to break even."
    ],
    keyPoints: [
      "Never risk more than 1% of account per trade",
      "Risk = potential loss if stop is hit, NOT position size",
      "Formula: (Account × Risk%) / Stop Distance = Shares",
      "1% risk means you survive even long losing streaks"
    ],
    quiz: [
      { question: "With a $50,000 account and 1% risk rule, what's your max risk per trade?", options: ["$5,000", "$500", "$50", "$1,000"], correctAnswer: 1, explanation: "$50,000 × 1% = $500 maximum risk per trade." },
      { question: "If your stop loss is $3 away from entry and max risk is $500, how many shares can you buy?", options: ["500", "166", "300", "1,500"], correctAnswer: 1, explanation: "$500 / $3 = 166 shares (rounded down). This ensures your max loss is $498, just under the $500 limit." }
    ]
  },
  {
    id: 7, sectionId: 1, sectionTitle: "Trading Fundamentals",
    title: "Risk/Reward Ratios - The Math of Profitability",
    description: "Understand why R:R matters more than win rate.",
    estimatedTime: 15,
    content: [
      "Risk/Reward Ratio (R:R) compares your potential loss to your potential gain. If you risk $100 to make $200, your R:R is 1:2. If you risk $100 to make $300, your R:R is 1:3.",
      "Here's the mind-blowing truth: You can be profitable while being WRONG more than half the time. With 1:3 R:R, you only need to win 25% of trades to break even. Win 35% and you're solidly profitable.",
      "With 1:1 R:R, you need 50%+ win rate. With 1:2 R:R, you need 34%+ win rate. With 1:3 R:R, you need 25%+ win rate. This is why professional traders focus on R:R, not win rate.",
      "Most beginners chase 90% win rate with tiny profits and huge losses (1:0.3 R:R). One big loss wipes out 10 small wins. Pros accept 50-60% win rate with big R:R ratios.",
      "The minimum acceptable R:R is 1:1.5. Ideally, aim for 1:2 or 1:3 on every trade. If you can't find 1:1.5 R:R, don't take the trade."
    ],
    keyPoints: [
      "R:R compares potential loss to potential gain",
      "1:3 R:R means you profit even winning only 35% of trades",
      "Pros focus on R:R, amateurs focus on win rate",
      "Never take a trade with worse than 1:1.5 R:R"
    ],
    quiz: [
      { question: "With 1:3 R:R, what minimum win rate do you need to be profitable?", options: ["50%", "75%", "About 25-30%", "90%"], correctAnswer: 2, explanation: "With 1:3 R:R, each win covers 3 losses. You need just over 25% win rate to break even, so around 30%+ to be profitable." }
    ]
  },
  {
    id: 8, sectionId: 1, sectionTitle: "Trading Fundamentals",
    title: "Market Sessions and When to Trade",
    description: "Learn the best and worst times to trade stocks and crypto.",
    estimatedTime: 10,
    content: [
      "US Stock Market hours: Regular trading 9:30 AM - 4:00 PM Eastern. This is when the most volume and opportunities occur.",
      "The first hour (9:30-10:30 AM) is the most volatile - big moves, high volume, but also most dangerous for beginners. The last hour (3:00-4:00 PM) is second most active as traders close positions.",
      "Lunch hour (11:30 AM - 1:30 PM) is typically the quietest. Low volume, choppy action, and lots of false signals. Many experienced traders take this time off.",
      "Crypto markets trade 24/7 but follow patterns. The US session (9 AM - 5 PM ET) has the most volume. The Asia session (7 PM - 3 AM ET) often sets the tone for the next day.",
      "Avoid trading during major holidays, half-days, and low-liquidity periods. Also be cautious around Fed announcements (FOMC meetings), jobs reports, and CPI data releases."
    ],
    keyPoints: [
      "First and last hours of stock market are most active",
      "Lunch hour is quiet and dangerous for traders",
      "Crypto follows patterns despite being 24/7",
      "Avoid low-liquidity periods and news events"
    ],
    quiz: [
      { question: "When is the best time to avoid trading stocks?", options: ["Market open", "Lunch hour (11:30-1:30)", "Last hour", "Pre-market"], correctAnswer: 1, explanation: "The lunch hour typically has low volume, choppy price action, and many false signals - not ideal for most trading strategies." }
    ]
  },
  // Section 2: Technical Analysis (Modules 9-18)
  {
    id: 9, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "Support and Resistance - The Foundation",
    description: "Learn to identify price floors and ceilings that drive market behavior.",
    estimatedTime: 20,
    content: [
      "Support is a price level where buying pressure is strong enough to prevent further decline. Think of it as a floor. When price approaches support, buyers step in because they remember it as a 'good price'.",
      "Resistance is a price level where selling pressure prevents further advance. Think of it as a ceiling. When price approaches resistance, sellers step in because they think price is 'too high'.",
      "These levels work because of psychology and memory. If AAPL bounced at $170 three times, traders remember that level. When price falls to $170 again, they buy - creating a self-fulfilling prophecy.",
      "Role Reversal: When support breaks, it often becomes resistance. When resistance breaks, it often becomes support. This is one of the most reliable patterns in technical analysis.",
      "How to identify: Look for levels where price has bounced or reversed multiple times. The more times a level is tested, the stronger it is. But be warned - the more times it's tested, the more likely it is to eventually break."
    ],
    keyPoints: [
      "Support = price floor (buyers defend this level)",
      "Resistance = price ceiling (sellers defend this level)",
      "Levels work due to collective market psychology",
      "Broken support becomes resistance and vice versa"
    ],
    quiz: [
      { question: "What happens when a support level breaks?", options: ["It becomes stronger support", "It often becomes resistance", "Nothing changes", "The trend always reverses"], correctAnswer: 1, explanation: "Role reversal is a key concept: when support breaks, traders who bought there now have losses and may sell if price returns to that level, creating resistance." }
    ]
  },
  {
    id: 10, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "Trend Lines and Channels",
    description: "Identify uptrends, downtrends, and sideways ranges.",
    estimatedTime: 15,
    content: [
      "An uptrend is defined by higher highs and higher lows. Each peak is higher than the last, and each dip is higher than the previous dip. Connect the lows with a line - that's your uptrend line.",
      "A downtrend is defined by lower highs and lower lows. Each peak is lower, each dip is lower. Connect the highs with a line - that's your downtrend line.",
      "A channel is created by drawing parallel lines along highs and lows. Price bounces between the channel boundaries. Channels can be ascending, descending, or horizontal.",
      "The trend is your friend until the end. Trading with the trend (buying in uptrends, selling in downtrends) has a much higher success rate than counter-trend trading.",
      "Trend lines need at least 2 touches to be valid, 3+ touches make them strong. When a trend line breaks with volume, it signals a potential trend change."
    ],
    keyPoints: [
      "Uptrend: higher highs + higher lows",
      "Downtrend: lower highs + lower lows",
      "Channels give clear buy and sell zones",
      "Always trade WITH the trend, not against it"
    ],
    quiz: [
      { question: "What defines an uptrend?", options: ["Price going straight up", "Higher highs and higher lows", "Green candles only", "Above the 200 MA"], correctAnswer: 1, explanation: "An uptrend is technically defined by a series of higher highs (each peak exceeds the previous) and higher lows (each dip stays above the previous)." }
    ]
  },
  {
    id: 11, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "Moving Averages - The Trader's Best Friend",
    description: "Master SMA, EMA, and how to use moving averages for trend identification.",
    estimatedTime: 20,
    content: [
      "A Simple Moving Average (SMA) is the average closing price over a set number of periods. The 20-day SMA is the average of the last 20 closing prices. It smooths out noise and shows the trend.",
      "An Exponential Moving Average (EMA) gives more weight to recent prices, making it react faster to price changes. Most active traders prefer EMAs for their responsiveness.",
      "Key periods: 9 EMA (very short-term), 20 EMA (short-term trend), 50 SMA (medium-term trend), 200 SMA (long-term trend). Price above these = bullish; below = bearish.",
      "Golden Cross: When the 50 MA crosses above the 200 MA - a bullish signal. Death Cross: When the 50 MA crosses below the 200 MA - a bearish signal. These are long-term trend indicators.",
      "Moving averages act as dynamic support and resistance. In an uptrend, price often bounces off the 20 or 50 MA. This makes them excellent for finding pullback entry points."
    ],
    keyPoints: [
      "SMA = simple average; EMA = weighted toward recent prices",
      "Key periods: 9, 20, 50, 200",
      "Price above MAs = bullish; below = bearish",
      "MAs act as dynamic support/resistance levels"
    ],
    quiz: [
      { question: "What is a Golden Cross?", options: ["Price crossing above 200 MA", "50 MA crossing above 200 MA", "Two green candles in a row", "RSI crossing above 70"], correctAnswer: 1, explanation: "A Golden Cross occurs when the 50-period moving average crosses above the 200-period moving average, signaling a potential long-term bullish trend change." }
    ]
  },
  {
    id: 12, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "RSI - Spotting Overbought and Oversold",
    description: "Use the Relative Strength Index to identify potential reversals.",
    estimatedTime: 15,
    content: [
      "RSI (Relative Strength Index) measures the speed and magnitude of price changes on a scale of 0-100. It helps identify when an asset might be overbought or oversold.",
      "Above 70 = Overbought. The asset may have rallied too fast and could pull back. Below 30 = Oversold. The asset may have dropped too fast and could bounce.",
      "RSI Divergence is one of the most powerful signals. If price makes a new high but RSI makes a lower high, momentum is weakening - bearish divergence. If price makes a new low but RSI makes a higher low - bullish divergence.",
      "Important: RSI alone is not enough to trade. An asset can stay overbought (above 70) for weeks in a strong uptrend. Always combine RSI with other indicators and price action.",
      "The most common RSI period is 14. Some traders use 9 (more sensitive) or 21 (smoother). In strong trends, use 80/20 levels instead of 70/30."
    ],
    keyPoints: [
      "RSI measures momentum on a 0-100 scale",
      "Above 70 = overbought; Below 30 = oversold",
      "RSI divergence signals potential reversals",
      "Never use RSI alone - always confirm with other tools"
    ],
    quiz: [
      { question: "What does RSI divergence mean?", options: ["RSI and price agree", "RSI and price disagree, suggesting momentum shift", "RSI is broken", "The market is closed"], correctAnswer: 1, explanation: "RSI divergence occurs when price and RSI move in opposite directions, suggesting underlying momentum is shifting and a reversal may be coming." }
    ]
  },
  {
    id: 13, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "MACD - Momentum and Trend Confirmation",
    description: "Learn the MACD indicator for momentum analysis and trend confirmation.",
    estimatedTime: 15,
    content: [
      "MACD (Moving Average Convergence Divergence) consists of three components: the MACD line (12 EMA - 26 EMA), the Signal line (9 EMA of MACD line), and the Histogram (MACD - Signal).",
      "Bullish signal: MACD line crosses above the Signal line. This suggests momentum is shifting upward. Bearish signal: MACD line crosses below the Signal line.",
      "The histogram shows the distance between MACD and Signal lines. Growing histogram = increasing momentum. Shrinking histogram = weakening momentum.",
      "Like RSI, MACD divergence is powerful. If price makes higher highs but MACD makes lower highs, the uptrend is losing steam.",
      "MACD works best for trend-following strategies. It's less useful in sideways/ranging markets where it gives many false signals."
    ],
    keyPoints: [
      "MACD shows momentum through moving average relationships",
      "Bullish crossover: MACD crosses above Signal line",
      "Histogram expansion = strong momentum",
      "Works best in trending markets, not ranges"
    ],
    quiz: [
      { question: "What does a shrinking MACD histogram indicate?", options: ["Momentum is increasing", "Momentum is decreasing", "Volume is dropping", "The trend is confirmed"], correctAnswer: 1, explanation: "A shrinking histogram means the MACD and Signal lines are converging, indicating that momentum is weakening." }
    ]
  },
  {
    id: 14, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "Volume Analysis - Following the Smart Money",
    description: "Learn why volume is the most honest indicator in trading.",
    estimatedTime: 15,
    content: [
      "Volume is the number of shares or contracts traded in a period. It's the most honest indicator because it shows actual market participation - real money being exchanged.",
      "Volume confirms price moves. A breakout above resistance on HIGH volume is likely real. A breakout on LOW volume is likely fake (a 'fakeout' that will reverse).",
      "Volume spikes often precede major price moves. A sudden surge in volume at a key level signals that big players (institutions) are getting involved.",
      "Declining volume during a trend suggests the trend is losing participation and may reverse. Volume should increase in the direction of the trend.",
      "The golden rule: Volume precedes price. Watch for volume changes before price changes - they often signal what's coming next."
    ],
    keyPoints: [
      "High volume breakouts are real; low volume breakouts are fake",
      "Volume spikes signal institutional activity",
      "Declining volume in a trend = trend weakness",
      "Volume precedes price - watch volume for early signals"
    ],
    quiz: [
      { question: "A stock breaks above resistance on very low volume. What does this suggest?", options: ["Strong breakout, buy immediately", "Likely a fakeout that may reverse", "Volume doesn't matter", "The trend is confirmed"], correctAnswer: 1, explanation: "Low volume breakouts lack the conviction and participation needed to sustain the move, making them likely to reverse (fakeouts)." }
    ]
  },
  {
    id: 15, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "Fibonacci Retracements",
    description: "Use Fibonacci levels to find high-probability entry points on pullbacks.",
    estimatedTime: 20,
    content: [
      "Fibonacci retracements are horizontal lines at key percentages (23.6%, 38.2%, 50%, 61.8%, 78.6%) between a swing high and swing low. These levels often act as support or resistance.",
      "Draw from swing low to swing high in an uptrend. The retracement levels show where price might find support during a pullback. The 50% and 61.8% levels are the most reliable.",
      "The 61.8% level (the 'golden ratio') is the most watched Fibonacci level. When price pulls back to 61.8% and bounces, it's often a strong entry signal for trend continuation.",
      "Fibonacci works best when it aligns with other support/resistance levels. If the 50% Fib level coincides with a moving average and a horizontal support, that's a powerful confluence zone.",
      "Fibonacci extensions (127.2%, 161.8%) project where price might go after a breakout. These are useful for setting profit targets."
    ],
    keyPoints: [
      "Key Fib levels: 38.2%, 50%, 61.8%",
      "61.8% is the 'golden ratio' - most important level",
      "Best when Fib aligns with other support/resistance",
      "Extensions project profit targets (127.2%, 161.8%)"
    ],
    quiz: [
      { question: "Which Fibonacci level is considered the 'golden ratio'?", options: ["23.6%", "38.2%", "50%", "61.8%"], correctAnswer: 3, explanation: "The 61.8% retracement level, derived from the golden ratio, is considered the most significant Fibonacci level and is closely watched by traders." }
    ]
  },
  {
    id: 16, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "Chart Patterns - Triangles, Flags, Wedges",
    description: "Recognize common chart patterns and what they predict.",
    estimatedTime: 20,
    content: [
      "Chart patterns are shapes that form on price charts and can predict future price direction. They're created by the collective psychology of all market participants.",
      "Ascending Triangle: flat top resistance + rising bottom support. Bullish - usually breaks upward. The flat top shows consistent selling at that price, while rising lows show increasing buying pressure.",
      "Head and Shoulders: Three peaks with the middle highest. It's a reversal pattern - signals the end of an uptrend. The neckline (support connecting the two valleys) is the key level.",
      "Bull Flag: A sharp move up (the pole) followed by a small downward channel (the flag). Bullish continuation - expect another leg up equal to the pole length.",
      "Double Bottom: Price hits the same support level twice and bounces both times, forming a 'W' shape. Bullish reversal signal. Double Top ('M' shape) is the bearish equivalent."
    ],
    keyPoints: [
      "Ascending triangle = bullish continuation",
      "Head and Shoulders = trend reversal",
      "Bull/Bear flags = continuation after sharp move",
      "Double top/bottom = reversal at key levels"
    ],
    quiz: [
      { question: "What does a Head and Shoulders pattern typically signal?", options: ["Trend continuation", "Trend reversal", "Sideways movement", "Increasing volume"], correctAnswer: 1, explanation: "Head and Shoulders is a classic reversal pattern, indicating that an uptrend is ending and a downtrend may begin once the neckline breaks." }
    ]
  },
  {
    id: 17, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "Candlestick Patterns",
    description: "Read individual and multi-candle patterns for entry and exit signals.",
    estimatedTime: 20,
    content: [
      "Doji: Open and close are nearly identical, creating a cross shape. It signals indecision - the battle between buyers and sellers is even. Often appears at turning points.",
      "Hammer: Small body at the top, long lower wick. Appears in downtrends and signals potential reversal upward. The long wick shows sellers pushed price down but buyers fought back.",
      "Engulfing Pattern: A candle that completely 'engulfs' the previous candle. Bullish engulfing (green candle engulfs red) = buyers taking control. Bearish engulfing = sellers taking control.",
      "Morning Star: Three-candle pattern - big red candle, small indecision candle (doji or spinning top), big green candle. Signals bullish reversal at the bottom of a downtrend.",
      "Context matters more than the pattern itself. A hammer at strong support after a long downtrend is powerful. A hammer in the middle of nowhere means little. Always consider WHERE the pattern forms."
    ],
    keyPoints: [
      "Doji = indecision, potential turning point",
      "Hammer = potential bullish reversal (in downtrend)",
      "Engulfing = shift of power between buyers/sellers",
      "Context matters: WHERE the pattern forms is crucial"
    ],
    quiz: [
      { question: "What does a hammer candlestick at a support level suggest?", options: ["Sellers are in control", "Potential bullish reversal", "The support will break", "Nothing - single candles don't matter"], correctAnswer: 1, explanation: "A hammer at support shows that sellers tried to push price lower but buyers stepped in strongly. Combined with the support level, it's a potential bullish reversal signal." }
    ]
  },
  {
    id: 18, sectionId: 2, sectionTitle: "Technical Analysis",
    title: "Multi-Timeframe Analysis",
    description: "Use multiple timeframes to find high-probability trade setups.",
    estimatedTime: 20,
    content: [
      "Multi-timeframe analysis means looking at the same asset on different timeframes to get a complete picture. This is how professional traders find the best entries.",
      "Top-down approach: Start with the daily chart for overall trend direction. Then use 4-hour for entry zones. Finally, use 1-hour or 15-minute for precise entry timing.",
      "All timeframes should align for the highest probability trades. If the daily is bullish, the 4-hour is pulling back to support, and the 1-hour shows a reversal candle - that's a strong long setup.",
      "The higher timeframe always wins. If the daily chart is in a downtrend, buying on a 5-minute chart uptrend is fighting the bigger picture. Align with the higher timeframe.",
      "Common combinations: Day traders use 1h/15m/5m. Swing traders use Daily/4h/1h. Position traders use Weekly/Daily/4h. Always have at least 3 timeframes in your analysis."
    ],
    keyPoints: [
      "Use 3 timeframes: trend, entry zone, precision",
      "Higher timeframe trend always takes priority",
      "Best trades: all timeframes align in same direction",
      "Day traders: 1h/15m/5m; Swing: Daily/4h/1h"
    ],
    quiz: [
      { question: "If the daily chart shows a downtrend, what should you do on the 5-minute chart?", options: ["Buy the dips", "Look for short setups aligned with daily", "Ignore the daily chart", "Switch to crypto"], correctAnswer: 1, explanation: "The higher timeframe always wins. If the daily is bearish, you should look for short/sell opportunities on lower timeframes that align with the bigger picture." }
    ]
  },
  // Section 3: Fundamental Analysis (Modules 19-24)
  {
    id: 19, sectionId: 3, sectionTitle: "Fundamental Analysis",
    title: "Reading Financial Statements (Stocks)",
    description: "Understand income statements, balance sheets, and key financial metrics.",
    estimatedTime: 25,
    content: [
      "The Income Statement shows revenue (what the company earns), expenses (what it spends), and net income (profit). Key metric: Earnings Per Share (EPS) = Net Income / Shares Outstanding.",
      "The Balance Sheet shows assets (what the company owns), liabilities (what it owes), and equity (ownership value). A healthy company has more assets than liabilities.",
      "Cash Flow Statement shows actual cash moving in and out. A company can show profit on the income statement while running out of cash. Cash flow is reality; earnings can be manipulated.",
      "P/E Ratio (Price/Earnings) tells you how much you're paying for each dollar of earnings. AAPL with P/E of 28 means you pay $28 for every $1 of annual earnings. High P/E = expensive or high growth expected.",
      "Key metrics to watch: Revenue growth (is the company growing?), Profit margins (is it efficient?), Debt-to-equity (is it overleveraged?), Free cash flow (does it generate real cash?)."
    ],
    keyPoints: [
      "Income statement: revenue, expenses, profit",
      "Balance sheet: assets vs liabilities",
      "Cash flow > earnings (cash is king)",
      "P/E ratio shows how expensive a stock is"
    ],
    quiz: [
      { question: "Why is cash flow more important than earnings?", options: ["It's not - earnings matter more", "Cash flow shows actual money movement; earnings can be manipulated", "Cash flow is easier to read", "They're the same thing"], correctAnswer: 1, explanation: "Earnings can be manipulated through accounting practices, but cash flow shows actual money entering and leaving the business. Cash is reality." }
    ]
  },
  {
    id: 20, sectionId: 3, sectionTitle: "Fundamental Analysis",
    title: "Earnings Reports and Reactions",
    description: "Understand how quarterly earnings move stock prices.",
    estimatedTime: 15,
    content: [
      "Public companies report earnings quarterly (4 times per year). These reports include EPS, revenue, and forward guidance. Markets react instantly to the results.",
      "An earnings 'beat' means the company exceeded analyst expectations. An earnings 'miss' means it fell short. But the reaction isn't always logical - stocks can drop on beats if guidance disappoints.",
      "Guidance (forward-looking statements) often matters more than the actual numbers. A company beating this quarter but lowering next quarter's outlook will usually drop.",
      "Earnings create gaps - the stock opens significantly higher or lower the next morning. These gaps can destroy stop losses. This is why many traders avoid holding through earnings.",
      "Trading earnings is essentially gambling unless you have an edge. The safest approach: trade the reaction AFTER the report, not before. Let the market show you direction first."
    ],
    keyPoints: [
      "Earnings happen quarterly - EPS, revenue, guidance",
      "Guidance often matters more than actual results",
      "Earnings gaps can destroy stop losses",
      "Safest: trade the reaction after, not before"
    ],
    quiz: [
      { question: "Why might a stock drop after beating earnings expectations?", options: ["The market is broken", "Forward guidance was lowered", "Beats always cause drops", "Volume was too high"], correctAnswer: 1, explanation: "If a company beats current quarter expectations but lowers future guidance, the market looks ahead and sells based on the weaker outlook." }
    ]
  },
  {
    id: 21, sectionId: 3, sectionTitle: "Fundamental Analysis",
    title: "Crypto Fundamentals - Beyond the Hype",
    description: "Evaluate cryptocurrency projects using real metrics, not hype.",
    estimatedTime: 20,
    content: [
      "Tokenomics is the economics of a crypto token: total supply, circulating supply, inflation rate, and burn mechanisms. A token with infinite supply and no burns will likely lose value over time.",
      "Utility: Does the project solve a real problem? Ethereum enables smart contracts. Chainlink provides oracle data. Many tokens have no real utility - they're just speculation.",
      "Adoption metrics matter: active addresses (real users), daily transactions (actual usage), TVL for DeFi (total value locked in the protocol), and developer activity (GitHub commits).",
      "Social sentiment can be tracked through Twitter followers, Reddit activity, and Discord/Telegram community size. But beware: bots can inflate these numbers.",
      "Key red flags: Anonymous team, unrealistic promises (100x guaranteed), no working product, copy-paste code, insider token allocations >50%, no audit. If something sounds too good to be true, it is."
    ],
    keyPoints: [
      "Tokenomics: supply, inflation, burns matter",
      "Real utility > hype and speculation",
      "Track adoption: active addresses, TVL, dev activity",
      "Red flags: anonymous team, no product, unrealistic promises"
    ],
    quiz: [
      { question: "Which metric best shows actual crypto adoption?", options: ["Twitter followers", "Token price", "Active addresses and daily transactions", "Market cap"], correctAnswer: 2, explanation: "Active addresses and daily transactions show real people actually using the network, which is the truest measure of adoption." }
    ]
  },
  {
    id: 22, sectionId: 3, sectionTitle: "Fundamental Analysis",
    title: "News Trading - Catalysts and Reactions",
    description: "Learn how news moves markets and how to trade (or avoid) news events.",
    estimatedTime: 15,
    content: [
      "News catalysts include earnings, FDA approvals, mergers/acquisitions, lawsuits, regulatory changes, and product launches. Each type moves prices in predictable patterns.",
      "'Buy the rumor, sell the news' is one of the oldest market sayings. Markets often price in expected good news beforehand, then sell off when the news actually hits.",
      "News spikes are often followed by reversals. The initial reaction is emotional and often excessive. The second reaction (30-60 minutes later) is more rational.",
      "Fake breakouts on news are common. Price spikes up on a headline, attracts FOMO buyers, then reverses sharply - trapping everyone who chased the initial move.",
      "The safest approach for beginners: Don't trade the news itself. Wait for the dust to settle (at least 30 minutes), then look for a technical setup based on the new price level."
    ],
    keyPoints: [
      "Markets often 'buy the rumor, sell the news'",
      "Initial news reactions are emotional and often reverse",
      "Don't chase news spikes - they trap FOMO traders",
      "Wait for dust to settle, then trade the technical setup"
    ],
    quiz: [
      { question: "What does 'buy the rumor, sell the news' mean?", options: ["Always buy before news", "Markets price in expectations, then reverse when news hits", "Rumors are always true", "News doesn't affect prices"], correctAnswer: 1, explanation: "Markets anticipate and price in expected events. When the actual news hits, the 'surprise' is already priced in, and traders sell to take profits - causing a reversal." }
    ]
  },
  {
    id: 23, sectionId: 3, sectionTitle: "Fundamental Analysis",
    title: "Macro Economics - The Big Picture",
    description: "Understand how interest rates, inflation, and GDP affect markets.",
    estimatedTime: 20,
    content: [
      "Interest rates (set by the Federal Reserve) are the single most important macro factor. When rates rise, borrowing costs increase, companies grow slower, and stock valuations compress.",
      "Inflation (measured by CPI) erodes purchasing power. High inflation leads to rate hikes (bearish for stocks). Low inflation allows rate cuts (bullish for stocks).",
      "GDP (Gross Domestic Product) measures economic output. Growing GDP = healthy economy = bullish. Negative GDP = recession = bearish. Two consecutive quarters of negative GDP = official recession.",
      "Risk-on vs risk-off: In risk-on environments (low rates, growing economy), money flows into stocks and crypto. In risk-off (high rates, recession fears), money flows into bonds, gold, and cash.",
      "Crypto is increasingly correlated with traditional markets. When the Fed raises rates aggressively, crypto usually dumps along with stocks. Bitcoin is no longer the 'uncorrelated asset' it once was."
    ],
    keyPoints: [
      "Interest rates are the #1 macro driver of markets",
      "High inflation → rate hikes → bearish for stocks/crypto",
      "Risk-on = stocks/crypto up; Risk-off = bonds/gold up",
      "Crypto now correlates with traditional markets"
    ],
    quiz: [
      { question: "What typically happens to stocks when interest rates rise?", options: ["They go up", "They go down or stagnate", "Nothing changes", "Only tech stocks are affected"], correctAnswer: 1, explanation: "Higher interest rates increase borrowing costs, slow growth, and make bonds more attractive relative to stocks - all bearish for stock prices." }
    ]
  },
  {
    id: 24, sectionId: 3, sectionTitle: "Fundamental Analysis",
    title: "Sector Rotation and Market Cycles",
    description: "Learn how money flows between sectors during different market phases.",
    estimatedTime: 15,
    content: [
      "Markets move in cycles: Accumulation (smart money buying after a bottom), Markup (uptrend as everyone joins), Distribution (smart money selling at the top), Markdown (downtrend as everyone panics).",
      "Different sectors lead at different cycle stages. Early bull market: financials and industrials lead. Mid bull: technology and consumer discretionary. Late bull: energy and materials. Bear: utilities and healthcare.",
      "In crypto, similar rotation exists. Bitcoin leads first, then Ethereum, then large-cap altcoins, then small-cap altcoins, then meme coins (the riskiest). When meme coins pump, the cycle is usually near its end.",
      "Following the hot sector (momentum trading) can be very profitable. When AI stocks are running, trade AI stocks. When DeFi is hot, trade DeFi tokens. Don't fight the narrative.",
      "Warning signs of cycle end: Everyone is bullish, taxi drivers give stock tips, meme coins 10x daily, 'this time is different' mentality. When everyone is bullish, the top is near."
    ],
    keyPoints: [
      "Markets cycle: accumulation → markup → distribution → markdown",
      "Different sectors lead at different cycle stages",
      "In crypto: BTC first → ETH → altcoins → meme coins",
      "When everyone is bullish, the top is near"
    ],
    quiz: [
      { question: "In crypto market cycles, what typically signals the cycle is near its end?", options: ["Bitcoin making new highs", "Ethereum outperforming", "Meme coins pumping massively", "Institutional adoption"], correctAnswer: 2, explanation: "When money flows to the riskiest, most speculative assets (meme coins), it signals peak euphoria and usually means the cycle is near its end." }
    ]
  },
  // Section 4: Trading Strategies (Modules 25-36)
  {
    id: 25, sectionId: 4, sectionTitle: "Trading Strategies",
    title: "Breakout Trading - Capturing Explosive Moves",
    description: "Learn to trade price breakouts above resistance with volume confirmation.",
    estimatedTime: 20,
    content: [
      "A breakout occurs when price moves above resistance or below support with conviction. Breakouts can lead to explosive moves as trapped traders are forced to cover.",
      "Volume confirmation is critical. A real breakout has significantly above-average volume (1.5x or more). Without volume, it's likely a fakeout that will reverse.",
      "False breakouts (bull traps and bear traps) are common. Price breaks above resistance, attracts buyers, then reverses sharply. This is why waiting for confirmation is essential.",
      "Two approaches: Enter immediately on the break (aggressive) or wait for a retest of the broken level (conservative). Retests offer better risk/reward but you might miss fast breakouts.",
      "Stop loss goes below the breakout level (if long) or above (if short). If price returns inside the range, the breakout failed and you should exit."
    ],
    keyPoints: [
      "Breakouts need volume confirmation (1.5x average+)",
      "False breakouts are common - wait for confirmation",
      "Retest entries offer better R:R but might miss moves",
      "Stop below breakout level - if it fails, exit"
    ],
    quiz: [
      { question: "What's the most important confirmation for a breakout?", options: ["RSI above 70", "Volume significantly above average", "MACD crossover", "Moving average alignment"], correctAnswer: 1, explanation: "Volume is the most critical breakout confirmation. High volume shows real conviction and participation, while low volume breakouts frequently fail." }
    ]
  },
  {
    id: 26, sectionId: 4, sectionTitle: "Trading Strategies",
    title: "Trend Following - Riding the Wave",
    description: "Master the art of identifying and riding strong trends.",
    estimatedTime: 20,
    content: [
      "Trend following is one of the oldest and most reliable strategies. The concept is simple: identify a strong trend and join it. 'The trend is your friend until the end.'",
      "Identifying strong trends: Price above rising 20 and 50 MAs, making higher highs and higher lows, with RSI above 50. All these conditions confirm an uptrend worth trading.",
      "Enter on pullbacks to support, not at highs. Wait for price to pull back to the 20 MA or a support level, then enter when it bounces. This gives better risk/reward than chasing.",
      "Pyramiding: Adding to winning positions as the trend continues. If your first entry is profitable and the trend is strong, add a smaller position at the next pullback. This maximizes winners.",
      "Exit when the trend breaks: Price closes below the 50 MA, makes a lower low, or a key support level breaks. Don't wait for the trend to completely reverse - take profit while it's there."
    ],
    keyPoints: [
      "Identify trends with MAs, higher highs/lows, RSI>50",
      "Enter on pullbacks to support, not at new highs",
      "Pyramid: add to winners at pullbacks",
      "Exit when trend structure breaks"
    ],
    quiz: [
      { question: "When should you enter a trend-following trade?", options: ["At the very top of the move", "On pullbacks to support in the trend", "When RSI is overbought", "After the trend has ended"], correctAnswer: 1, explanation: "Entering on pullbacks to support gives better risk/reward and higher probability than chasing at highs." }
    ]
  },
  // Remaining modules 27-36 (abbreviated for brevity - key content included)
  { id: 27, sectionId: 4, sectionTitle: "Trading Strategies", title: "Swing Trading - Multi-Day Plays", description: "Hold positions 2-10 days to capture bigger price moves.", estimatedTime: 20, content: ["Swing trading holds positions for 2-10 days, capturing multi-day price moves. It requires less screen time than day trading (30-60 min daily) making it ideal for people with jobs.", "The sweet spot: Swing trading combines the best of day trading (active management) and position trading (bigger moves). You avoid overnight gaps on most days while catching substantial trends.", "Daily chart for setup identification, 4-hour for entry timing. Look for pullbacks in strong trends, breakouts from consolidation, or reversal patterns at key levels.", "Overnight risk is the main concern. Gap downs can blow through stops. Mitigate by avoiding earnings, keeping position sizes reasonable, and using wider stops than day trades.", "Swing trade checklist: Clear trend on daily? Pullback to support? Volume confirmation? R:R at least 1:2? Position sized correctly? No earnings this week? If all yes, take the trade."], keyPoints: ["2-10 day hold, 30-60 min daily screen time", "Daily chart for setups, 4h for entries", "Manage overnight risk with wider stops", "Perfect for traders with day jobs"], quiz: [{ question: "What's the main risk of swing trading?", options: ["Too much screen time", "Overnight gaps bypassing stops", "High commission costs", "Low profit potential"], correctAnswer: 1, explanation: "Overnight gaps can cause price to open significantly above/below your stop loss, resulting in larger losses than planned." }] },
  { id: 28, sectionId: 4, sectionTitle: "Trading Strategies", title: "Scalping - Quick Profits, High Frequency", description: "Understand the fastest trading style and why it's not for beginners.", estimatedTime: 15, content: ["Scalping involves holding positions for seconds to minutes, targeting tiny price movements (0.1-0.5%). Scalpers may make 20-100 trades per day.", "It requires intense focus, fast execution, and low commissions. The margin for error is razor-thin - one big loss can wipe out many small wins.", "Scalping works best with high liquidity (AAPL, SPY, BTC) and tight spreads. In low-liquidity assets, the spread alone can eat your profits.", "Not recommended for beginners. Start with swing trading, then day trading, then consider scalping only after consistent profitability in slower styles.", "If you must scalp, use strict rules: max loss per trade (0.1% of account), max daily loss (1%), and stop trading after 3 consecutive losses."], keyPoints: ["Seconds to minutes hold, 20-100 trades/day", "Requires intense focus and low commissions", "One big loss wipes out many small wins", "Not for beginners - master slower styles first"], quiz: [{ question: "Why is scalping not recommended for beginners?", options: ["It's illegal", "The margin for error is tiny and one loss wipes many wins", "It doesn't work", "It requires too much money"], correctAnswer: 1, explanation: "Scalping has razor-thin margins, high stress, and one emotional mistake can wipe out hours of small profits." }] },
  { id: 29, sectionId: 4, sectionTitle: "Trading Strategies", title: "Range Trading - Buy Low, Sell High", description: "Trade sideways markets by buying at support and selling at resistance.", estimatedTime: 15, content: ["Range trading works when price moves sideways between clear support and resistance. Buy near support, sell near resistance, repeat.", "Identify ranges on daily charts: price bouncing between two levels at least 3 times. The more touches, the stronger the range.", "Entry at support with stop below the range. Entry at resistance (short) with stop above. Take profit at the other end of the range.", "Ranges eventually break. When they do, the breakout move is usually explosive. Watch for volume increases as warning signs of an impending breakout.", "Range trading has higher win rate but lower R:R than breakout trading. Best used in low-volatility periods when trends haven't developed."], keyPoints: ["Buy at support, sell at resistance in ranges", "More touches of levels = stronger range", "Ranges eventually break - watch for volume clues", "Higher win rate but lower R:R than breakout trading"], quiz: [{ question: "When is range trading most effective?", options: ["In strong uptrends", "In low-volatility, sideways markets", "During earnings season", "In high-volatility environments"], correctAnswer: 1, explanation: "Range trading works best in calm, sideways markets where price bounces predictably between support and resistance." }] },
  { id: 30, sectionId: 4, sectionTitle: "Trading Strategies", title: "Momentum Trading - Following Strength", description: "Buy assets showing strong upward momentum and ride the wave.", estimatedTime: 15, content: ["Momentum trading follows the principle of 'buy high, sell higher.' Instead of buying cheap, you buy strength and ride the momentum wave.", "Momentum signals: Price making new highs, volume surging above average, RSI above 60 (not yet overbought), MACD expanding. All indicators showing strength.", "The key is entering on pullbacks within the momentum move, not at the very peak. Wait for small consolidation or pullback, then enter when momentum resumes.", "FOMO is the enemy. Chasing a stock that's already up 20% in a day is gambling, not momentum trading. Wait for a setup, not a spike.", "Exit when momentum fades: volume drops, RSI divergence appears, or price fails to make a new high. Take profits before the crowd realizes the move is over."], keyPoints: ["Buy strength, not weakness - 'buy high, sell higher'", "Enter on pullbacks within momentum moves", "Don't chase - FOMO is the enemy", "Exit when volume drops or divergence appears"], quiz: [{ question: "What is the biggest risk in momentum trading?", options: ["The market closing", "FOMO - chasing moves that already happened", "Low volume", "Currency fluctuations"], correctAnswer: 1, explanation: "FOMO causes traders to chase extended moves and buy at tops. Discipline to wait for proper entry points is essential." }] },
  { id: 31, sectionId: 4, sectionTitle: "Trading Strategies", title: "Mean Reversion - Fading Extremes", description: "Trade against extreme moves betting on price returning to average.", estimatedTime: 15, content: ["Mean reversion is based on the idea that price tends to return to its average after extreme moves. If RSI is at 90 (extremely overbought), price is likely to pull back.", "This is a counter-trend strategy - you're trading against the current direction. It's inherently riskier because trends can stay extreme longer than you expect.", "Best conditions: RSI below 20 or above 80, price extended far from 20 MA (2+ standard deviations), volume spike suggesting exhaustion.", "Strict stops are essential. If the extreme continues, your stop must limit the damage. Mean reversion trades should risk less than trend-following trades.", "Works best in ranging markets. In strong trends, 'overbought' can stay overbought for weeks. Don't fight strong trends with mean reversion."], keyPoints: ["Price tends to return to average after extremes", "Counter-trend = riskier, needs strict stops", "Best when RSI extreme + price far from MA", "Don't use in strong trends - only in ranges"], quiz: [{ question: "When is mean reversion most dangerous?", options: ["In ranging markets", "In strong trending markets", "During low volume", "On weekends"], correctAnswer: 1, explanation: "In strong trends, 'extreme' readings can persist for weeks. Mean reversion against a strong trend leads to large losses." }] },
  { id: 32, sectionId: 4, sectionTitle: "Trading Strategies", title: "News Fading - Counter-Intuitive but Profitable", description: "Learn to trade against initial news reactions for profit.", estimatedTime: 15, content: ["News fading means trading AGAINST the initial news reaction. When good news causes a spike, you sell. When bad news causes a dump, you buy.", "This works because initial reactions are emotional and often excessive. The stock gaps up 5% on earnings, but the fair value increase is only 2%. The extra 3% is FOMO and reverses.", "Wait for the initial spike to exhaust (usually 15-30 minutes), then enter counter to the move. The reversal often covers 40-60% of the initial move.", "This is an advanced strategy. Beginners should NOT attempt it. You need experience reading price action, volume, and knowing when a move is exhausted vs just beginning.", "Risk management is critical. Use tight stops and small positions. Sometimes news is genuinely game-changing and the move continues. Your stop must protect you."], keyPoints: ["Trade against excessive initial news reactions", "Wait 15-30 min for initial spike to exhaust", "Advanced strategy - not for beginners", "Tight stops essential - news can be genuinely big"], quiz: [{ question: "Why does news fading work?", options: ["News is always wrong", "Initial reactions are emotional and often excessive", "Markets always reverse", "Volume is always low on news"], correctAnswer: 1, explanation: "The first reaction to news is driven by emotion (FOMO/fear), which often overshoots the actual impact. The correction toward fair value is where the fade profit comes from." }] },
  { id: 33, sectionId: 4, sectionTitle: "Trading Strategies", title: "Options Basics - Calls and Puts", description: "Understand the fundamentals of options trading.", estimatedTime: 25, content: ["A Call option gives you the RIGHT to buy a stock at a specific price (strike) before a specific date (expiration). You profit if the stock goes UP above the strike.", "A Put option gives you the RIGHT to sell at a specific price before expiration. You profit if the stock goes DOWN below the strike.", "Options have a premium (cost). You pay the premium to buy the option. If the stock doesn't move enough, your option expires worthless and you lose the premium.", "Theta (time decay) is the enemy of option buyers. Options lose value every day. The closer to expiration, the faster they decay. This is why most options expire worthless.", "For beginners: Covered calls (sell calls on stocks you own for income) and protective puts (buy puts to insure your stocks) are the safest strategies."], keyPoints: ["Calls = bet on UP; Puts = bet on DOWN", "Options have premium (cost) and expiration date", "Theta decay erodes option value daily", "Covered calls and protective puts are safest"], quiz: [{ question: "What happens to an option as expiration approaches?", options: ["It gains value", "Time decay (theta) accelerates", "Nothing changes", "It automatically exercises"], correctAnswer: 1, explanation: "Theta decay accelerates as expiration approaches. This is why most options expire worthless - time is the enemy of option buyers." }] },
  { id: 34, sectionId: 4, sectionTitle: "Trading Strategies", title: "Crypto-Specific Strategies", description: "Strategies unique to cryptocurrency markets.", estimatedTime: 20, content: ["New listing trading: Newly listed tokens on major exchanges often see extreme volatility. Wait for the initial dump (people selling airdrops), then enter on the reversal.", "Narrative trading: Crypto moves in narratives - AI tokens, Layer 2s, DeFi, RWA. Identify the hot narrative early, buy leaders in that category, sell when narrative fades.", "Bitcoin dominance is key. When BTC dominance rises, money flows from altcoins to Bitcoin (risk-off). When it falls, money flows into altcoins (risk-on altcoin season).", "Fear and Greed Index: Extreme fear (0-25) = buying opportunity. Extreme greed (75-100) = time to take profits. Be greedy when others are fearful.", "Beware fake volume and wash trading on smaller exchanges. Stick to top exchanges (Binance, Coinbase) and established tokens. Don't chase 100x promises on unknown tokens."], keyPoints: ["New listings have extreme volatility - wait for the dip", "Follow the narrative: AI, DeFi, Layer 2, etc.", "BTC dominance up = risk-off; down = altcoin season", "Extreme fear = buy; Extreme greed = sell"], quiz: [{ question: "What does rising Bitcoin dominance typically mean?", options: ["Altcoins are about to pump", "Money is flowing from altcoins to Bitcoin (risk-off)", "The market is bullish", "Nothing - it's random"], correctAnswer: 1, explanation: "Rising BTC dominance means money is concentrating in Bitcoin at the expense of altcoins, signaling a risk-off environment." }] },
  { id: 35, sectionId: 4, sectionTitle: "Trading Strategies", title: "Portfolio Management and Diversification", description: "Don't put all your eggs in one basket.", estimatedTime: 15, content: ["Diversification means spreading risk across multiple assets. If one trade fails, others can compensate. Never put more than 25% of your capital in one trade.", "Correlation matters. Holding AAPL, MSFT, and GOOGL isn't diversified - they're all tech and move together. True diversification includes different sectors and asset types.", "Cash is a position. Sometimes the best trade is no trade. Keeping 30-50% in cash during uncertain markets protects your capital and keeps you ready for opportunities.", "Maximum exposure guidelines: 25% max per position, 50% max per sector, 75% max total deployment. This leaves room for new opportunities and protects against sector-wide moves.", "Rebalancing: When a position grows to 30%+ of your portfolio (through gains), consider trimming back to 20-25%. This locks in profits and maintains diversification."], keyPoints: ["25% max per position, 50% max per sector", "Correlated assets aren't truly diversified", "Cash is a position - staying out is sometimes best", "Rebalance when positions grow too large"], quiz: [{ question: "Why is holding only tech stocks not truly diversified?", options: ["Tech stocks are bad", "They're highly correlated and move together", "They don't pay dividends", "They're too expensive"], correctAnswer: 1, explanation: "Highly correlated assets move together, so a tech selloff would hit all your positions simultaneously, defeating the purpose of diversification." }] },
  { id: 36, sectionId: 4, sectionTitle: "Trading Strategies", title: "Hedging - Protecting Your Gains", description: "Learn strategies to protect profits and limit downside.", estimatedTime: 15, content: ["Hedging means opening a position that profits when your main positions lose. It's insurance for your portfolio - costs money but protects against disaster.", "Simplest hedge: Buy put options on stocks you own. If the stock drops, the put gains value, offsetting your stock losses. Like paying insurance on your house.", "Inverse ETFs (like SQQQ for NASDAQ) go up when the market goes down. Holding a small inverse ETF position acts as portfolio insurance.", "The cost of hedging reduces your overall returns. In bull markets, hedges lose money. But in crashes, they save your account. It's the price of sleeping well at night.", "When to hedge vs when to exit: Hedge when you're long-term bullish but short-term uncertain (earnings, Fed meeting). Exit when your analysis says the trend has changed."], keyPoints: ["Hedging = insurance against losses", "Put options protect stock positions", "Inverse ETFs profit when markets drop", "Hedging costs money but saves accounts in crashes"], quiz: [{ question: "When should you consider hedging instead of selling?", options: ["Always hedge, never sell", "When you're short-term uncertain but long-term bullish", "Only when losing money", "Hedging is never worth it"], correctAnswer: 1, explanation: "Hedging makes sense when you believe in the long-term position but want protection against short-term risk events." }] },
  // Section 5: Trading Psychology (Modules 37-44)
  { id: 37, sectionId: 5, sectionTitle: "Trading Psychology", title: "Emotional Control - The #1 Reason Traders Fail", description: "Understand why emotions destroy trading accounts and how to manage them.", estimatedTime: 20, content: ["Trading psychology is the #1 reason traders fail. Not strategy, not market knowledge - emotions. Fear makes you exit winners too early. Greed makes you hold losers too long.", "The two most destructive emotions: Fear of missing out (FOMO) causes you to chase trades. Fear of loss causes you to avoid good setups or exit too early.", "Your brain is wired against profitable trading. Evolutionary psychology makes us feel losses 2x more than gains (loss aversion). This makes us hold losers and cut winners.", "The solution is RULES. Written rules, followed mechanically. Your strategy should tell you exactly when to enter, exit, and how much to risk. Follow the rules, not your feelings.", "Physical state affects trading. Sleep deprivation, hunger, stress, and alcohol all impair judgment. Never trade when you're not in peak mental condition."], keyPoints: ["Emotions are the #1 account killer", "Loss aversion makes us hold losers too long", "Written rules remove emotional decisions", "Physical state directly affects trading performance"], quiz: [{ question: "Why do most traders hold losing positions too long?", options: ["They don't have stops", "Loss aversion - losses feel 2x worse than gains", "They want to average down", "Commission costs"], correctAnswer: 1, explanation: "Loss aversion (a psychological bias) makes losses feel twice as painful as equivalent gains feel good. This makes traders reluctant to realize losses by selling." }] },
  { id: 38, sectionId: 5, sectionTitle: "Trading Psychology", title: "FOMO - Fear of Missing Out", description: "Overcome the urge to chase trades and buy at the top.", estimatedTime: 15, content: ["FOMO hits when you see a stock rocketing up without you. Your brain screams 'BUY NOW OR MISS IT FOREVER!' This is the voice that loses money.", "FOMO makes you abandon your strategy and chase extended moves. You buy at the top, watch it reverse, and take a loss you never should have risked.", "The cure: Remember that there's ALWAYS another trade. The market is open every day. Missing one move means nothing over a career of thousands of trades.", "Create a FOMO rule: If you missed the initial move, wait for a pullback entry or move to the next opportunity. NEVER chase.", "Track your FOMO trades separately. You'll find they have a much lower win rate than your planned trades. Data kills FOMO better than willpower."], keyPoints: ["FOMO makes you buy tops and sell bottoms", "There's ALWAYS another trade - missing one is fine", "Create a rule: never chase, wait for pullback or next setup", "Track FOMO trades separately to see how badly they perform"], quiz: [{ question: "What's the best cure for FOMO?", options: ["Buy smaller positions", "Remember there's always another trade tomorrow", "Trade faster", "Follow social media tips"], correctAnswer: 1, explanation: "Knowing that the market provides endless opportunities helps combat the urgency of FOMO. One missed trade is irrelevant over thousands of future opportunities." }] },
  { id: 39, sectionId: 5, sectionTitle: "Trading Psychology", title: "Revenge Trading - The Death Spiral", description: "Stop the destructive cycle of trying to 'get it back' after a loss.", estimatedTime: 15, content: ["Revenge trading is re-entering the market immediately after a loss, trying to 'get it back.' It's driven by anger, not analysis. It almost always leads to more losses.", "The cycle: Loss → Anger → Bigger position → Worse entry → Bigger loss → More anger → Even bigger position → Account blown. This can happen in a single day.", "The rule that saves accounts: After any loss, wait 1 hour minimum before the next trade. After 2 consecutive losses, stop trading for the day. No exceptions.", "Revenge trading abandons your strategy entirely. You enter trades that don't meet your criteria, with larger positions than your rules allow, and without proper stop losses.", "Remember: One loss is nothing. It's a normal part of trading. But one loss turning into five through revenge trading? That's how accounts die."], keyPoints: ["Revenge trading = anger-driven, not analysis-driven", "1 hour minimum wait after any loss", "Stop for the day after 2 consecutive losses", "One loss is normal; five from revenge trading kills accounts"], quiz: [{ question: "What should you do after taking a loss?", options: ["Immediately re-enter to get it back", "Wait at least 1 hour before next trade", "Double your next position size", "Stop trading forever"], correctAnswer: 1, explanation: "Waiting at least 1 hour after a loss lets emotions cool, preventing the destructive revenge trading cycle that turns one loss into many." }] },
  { id: 40, sectionId: 5, sectionTitle: "Trading Psychology", title: "Discipline and Patience - Waiting for Your Setup", description: "Learn that boredom is the price of profitability.", estimatedTime: 15, content: ["Good traders are bored most of the time. They sit, watch, and wait. When their setup appears, they execute. Then they go back to waiting.", "Most traders overtrade. They feel like they need to be 'doing something.' But every trade has a cost (spread, commissions, mental energy). Fewer, higher-quality trades win.", "Quality over quantity: A trader with 5 perfect trades per week outperforms one with 50 mediocre trades. Selectivity is a competitive advantage.", "The pain of missing out is temporary. The pain of losing money is lasting. Choose the temporary discomfort of patience over the lasting regret of impulsive trades.", "Practice intentional non-trading. Open your charts, analyze, and then close them without trading. This builds the discipline muscle."], keyPoints: ["Good traders are bored most of the time", "Fewer, higher-quality trades beat many mediocre ones", "Selectivity is a competitive advantage", "Practice intentional non-trading to build discipline"], quiz: [{ question: "Why do most traders overtrade?", options: ["More trades = more profit", "They feel they need to be 'doing something'", "Their strategy requires it", "Commissions are free"], correctAnswer: 1, explanation: "The psychological need to be active leads to overtrading. But each trade carries costs and risks. Patience and selectivity lead to better results." }] },
  { id: 41, sectionId: 5, sectionTitle: "Trading Psychology", title: "Confirmation Bias - Seeing What You Want to See", description: "Recognize and overcome the bias of seeking only confirming evidence.", estimatedTime: 15, content: ["Confirmation bias means seeking information that supports your existing belief. If you're bullish on AAPL, you'll find 10 reasons to buy and ignore 10 reasons to sell.", "This is dangerous because it blinds you to risk. You see bullish signals and ignore bearish ones. You rationalize holding losers because you find reasons to stay.", "The antidote: Before every trade, actively look for reasons NOT to enter. Play devil's advocate. If you can't find at least 2 strong reasons against the trade, you're not looking hard enough.", "Use a pre-trade checklist. Every condition must be met objectively. If even one fails, don't trade. Checklists remove the ability to rationalize bad trades.", "Review losing trades and ask: What warning signs did I ignore? You'll often find that the information was there, you just didn't want to see it."], keyPoints: ["We naturally seek evidence that confirms our beliefs", "Always look for reasons NOT to enter (devil's advocate)", "Pre-trade checklists enforce objectivity", "Review losses to find warning signs you ignored"], quiz: [{ question: "How can you combat confirmation bias?", options: ["Only read bullish analysis", "Actively look for reasons NOT to take the trade", "Trust your gut feeling more", "Ignore all analysis"], correctAnswer: 1, explanation: "Actively seeking counter-arguments forces you to consider all evidence, not just what supports your position." }] },
  { id: 42, sectionId: 5, sectionTitle: "Trading Psychology", title: "Loss Aversion - Holding Losers Too Long", description: "Why 'it's only a loss if I sell' is the most dangerous thought in trading.", estimatedTime: 15, content: ["'It's only a loss if I sell' is the thought that has destroyed more accounts than any other. An unrealized loss IS a real loss. The market doesn't care about your entry price.", "Loss aversion makes you hold losers hoping they'll come back. But while your capital is stuck in a losing position, you're missing better opportunities. This is called opportunity cost.", "The math is brutal: A stock drops 50%, it needs 100% gain to break even. A stock drops 90%, it needs 900% gain. The deeper the hole, the harder recovery becomes.", "Professional traders accept losses quickly. They know that cutting a $200 loss prevents a $2,000 loss. Small losses are the cost of doing business.", "Set your stop loss BEFORE entering the trade and NEVER move it farther from your entry. If it gets hit, accept it, journal it, and move on."], keyPoints: ["Unrealized losses ARE real losses", "Holding losers creates opportunity cost", "50% loss needs 100% gain to recover", "Cut losses quickly - small losses prevent big ones"], quiz: [{ question: "A stock drops 50% from your entry. What return do you need to break even?", options: ["50%", "75%", "100%", "150%"], correctAnswer: 2, explanation: "If a stock drops from $100 to $50 (50% loss), it needs to go from $50 to $100, which is a 100% gain. The math of losses is asymmetric." }] },
  { id: 43, sectionId: 5, sectionTitle: "Trading Psychology", title: "Building a Trading Routine", description: "Create daily, weekly, and monthly routines for consistent performance.", estimatedTime: 15, content: ["Morning routine (30 min): Check market news, review watchlist, update key levels on charts, identify potential setups for the day, set alerts.", "During market hours: Execute only trades that match your strategy. No improvising. Log every trade in your journal. Take breaks every 2 hours.", "End of day routine (15 min): Review all trades taken today. Update portfolio stats. Note emotional state throughout the day. Plan tomorrow's watchlist.", "Weekly review (1 hour): Analyze all trades from the week. Calculate win rate, R:R, profit factor. Identify patterns in wins and losses.", "Monthly review (2 hours): Evaluate strategy performance. Are rules still working? What needs adjustment? Compare results to goals. Plan next month."], keyPoints: ["Morning: news, watchlist, levels, setups", "During market: execute plan only, journal everything", "Daily review: trades, emotions, tomorrow's plan", "Weekly/monthly: analyze performance, adjust strategy"], quiz: [{ question: "Why is a trading routine important?", options: ["To look professional", "Routine removes emotional decisions and builds consistency", "Markets require it", "To trade more often"], correctAnswer: 1, explanation: "Routines create structure and consistency, removing emotional decision-making and ensuring you follow your strategy systematically." }] },
  { id: 44, sectionId: 5, sectionTitle: "Trading Psychology", title: "Trading Journal - Learning from Every Trade", description: "Why journaling is non-negotiable and how to do it effectively.", estimatedTime: 15, content: ["A trading journal records every trade with details: entry reason, setup quality, emotions, outcome, and lessons learned. It's your personal trading textbook.", "What to record: Date, asset, entry price, exit price, P&L, strategy used, setup quality (1-10), emotional state at entry and exit, mistakes made, lessons learned.", "Review your journal weekly. Look for patterns: 'I always lose when I trade in the first 15 minutes' or 'My best trades happen when RSI is below 30.'", "Your journal reveals truths that feeling hides. You might think you're good at breakout trading, but your journal might show swing trades are actually your best strategy.", "Make journaling non-negotiable. No trade goes unrecorded. The 5 minutes spent journaling saves hours of repeating the same mistakes."], keyPoints: ["Record everything: entry, exit, emotions, lessons", "Review weekly for patterns in wins and losses", "Journal reveals truth that feeling hides", "5 minutes journaling saves hours of repeated mistakes"], quiz: [{ question: "What's the most valuable insight from a trading journal?", options: ["Your total P&L", "Patterns in when and why you win or lose", "How many trades you make", "Your favorite stock"], correctAnswer: 1, explanation: "The patterns revealed by consistent journaling show you exactly what works and what doesn't in YOUR specific trading, which is more valuable than any textbook." }] },
  // Section 6: Risk Management (Modules 45-51)
  { id: 45, sectionId: 6, sectionTitle: "Risk Management", title: "The 1% Rule - Never Risk More Than 1% Per Trade", description: "The most important rule in trading, explained in depth.", estimatedTime: 15, content: ["The 1% rule means your potential loss on any single trade should never exceed 1% of your total account. This is the foundation of survival in trading.", "Example: $100,000 account × 1% = $1,000 max risk. If your stop loss is $5 away from entry, max shares = $1,000 / $5 = 200 shares.", "Why 1%? Even 10 consecutive losses (which happens) only costs 10% of your account. You can recover from 10%. You cannot recover from 50%.", "Most blown accounts violated this rule. Traders risk 5-10% per trade, hit a losing streak, and find themselves down 40-50% with no way to recover.", "Start with 0.5% risk per trade until you're consistently profitable. Then move to 1%. Only consider 2% after hundreds of profitable trades."], keyPoints: ["Max 1% of account at risk per trade", "10 consecutive losses = 10% drawdown (survivable)", "Most blown accounts violated this single rule", "Start at 0.5%, graduate to 1% after consistency"], quiz: [{ question: "With a $75,000 account and 1% rule, what's your max risk per trade?", options: ["$7,500", "$750", "$75", "$1,500"], correctAnswer: 1, explanation: "$75,000 × 1% = $750 maximum risk per trade." }] },
  { id: 46, sectionId: 6, sectionTitle: "Risk Management", title: "Stop Losses - Your Safety Net", description: "Why stops are mandatory and how to place them correctly.", estimatedTime: 15, content: ["A stop loss automatically exits your position at a predetermined price, limiting your loss. It's not optional - it's mandatory on every single trade.", "Where to place stops: Below support (long trades), above resistance (short trades). Stops should be at levels where your trade thesis is invalidated.", "Never place stops at round numbers ($50.00) or obvious levels. Other traders have stops there too, and the market often 'hunts' these levels before reversing.", "Never move your stop farther from entry. If you feel the urge to give it 'more room,' that's your emotions talking. The stop was set based on the chart - honor it.", "Getting stopped out is NOT failure. It's your stop doing exactly what it should - protecting your capital. A $200 stopped loss prevents a potential $2,000 loss."], keyPoints: ["Stops are mandatory on every trade - no exceptions", "Place below support, not at arbitrary levels", "Never move stops farther from entry", "Getting stopped = your risk management working"], quiz: [{ question: "What should you do if price is getting close to your stop?", options: ["Move the stop farther away", "Remove the stop entirely", "Let the stop do its job", "Add to the position"], correctAnswer: 2, explanation: "Let the stop do its job. It was placed based on technical analysis, not emotion. Moving it farther away increases risk beyond your plan." }] },
  { id: 47, sectionId: 6, sectionTitle: "Risk Management", title: "Position Sizing Calculator", description: "Master the formula that determines how many shares to buy.", estimatedTime: 15, content: ["The position sizing formula: (Account Size × Risk %) / Stop Loss Distance = Number of Shares/Units.", "Example 1: $100,000 account, 1% risk, $3.00 stop distance → $1,000 / $3.00 = 333 shares.", "Example 2: $50,000 account, 1% risk, $0.50 stop distance → $500 / $0.50 = 1,000 shares. Tighter stops = more shares (same risk).", "Example 3: $50,000 account, 1% risk, $500 stop distance (crypto) → $500 / $500 = 1 unit. Wider stops = fewer units (same risk).", "Always calculate BEFORE entering. Never enter first and figure out position size after. The calculation takes 10 seconds and is the difference between professional and amateur trading."], keyPoints: ["Formula: (Account × Risk%) / Stop Distance = Shares", "Tight stops = more shares; Wide stops = fewer shares", "Always calculate BEFORE entering the trade", "Same dollar risk regardless of stop distance"], quiz: [{ question: "$80,000 account, 1% risk, $4 stop distance. How many shares?", options: ["800", "200", "2000", "80"], correctAnswer: 1, explanation: "$80,000 × 1% = $800 risk. $800 / $4 stop = 200 shares." }] },
  { id: 48, sectionId: 6, sectionTitle: "Risk Management", title: "Portfolio Heat - Total Risk Across All Positions", description: "Monitor total exposure to prevent simultaneous losses.", estimatedTime: 15, content: ["Portfolio heat is the sum of all position risks. If you have 5 positions each risking 1%, your total heat is 5% - meaning if ALL stops hit, you lose 5%.", "Maximum recommended heat: 5% for beginners, 8% for intermediate, 10% for advanced. Beyond that, you're one bad day from a serious drawdown.", "Don't open a 6th position if your heat is already at 5%. Wait for one position to close (profit or stop) before adding new risk.", "Correlated positions amplify heat. 3 tech stocks each risking 1% = 3% heat on paper, but if tech sells off, all 3 may stop out simultaneously for effective 3% loss.", "Track your heat daily. Write it down. Know exactly how much you stand to lose if everything goes wrong at once."], keyPoints: ["Portfolio heat = sum of all position risks", "Max 5% heat for beginners", "Correlated positions amplify real risk", "Track heat daily - know your worst case"], quiz: [{ question: "If you have 4 positions each risking 1.5%, what's your portfolio heat?", options: ["1.5%", "4%", "6%", "15%"], correctAnswer: 2, explanation: "4 positions × 1.5% risk each = 6% total portfolio heat." }] },
  { id: 49, sectionId: 6, sectionTitle: "Risk Management", title: "Drawdown Management - Recovering from Losses", description: "Understand why preventing big losses is more important than chasing big wins.", estimatedTime: 15, content: ["Drawdown measures the decline from your peak account value to the current low. A 10% drawdown means your account went from $100,000 to $90,000.", "The recovery math is asymmetric: 10% loss needs 11.1% gain. 20% loss needs 25% gain. 50% loss needs 100% gain. 90% loss needs 900% gain to recover.", "This is why risk management exists. Preventing a 20% drawdown is far easier than recovering from one. Defense wins in trading.", "After a 10% drawdown: Reduce position sizes by half. After 15%: Stop trading for a week. After 20%: Stop for a month and reassess your entire strategy.", "Track your drawdown daily. If you're not tracking it, you don't know you're in trouble until it's too late."], keyPoints: ["Recovery from losses is asymmetrically harder", "50% loss requires 100% gain to recover", "Reduce size after 10% drawdown, stop after 15%", "Defense (preventing losses) > offense (chasing gains)"], quiz: [{ question: "How much gain is needed to recover from a 50% loss?", options: ["50%", "75%", "100%", "200%"], correctAnswer: 2, explanation: "A 50% loss takes you from $100,000 to $50,000. Getting back to $100,000 from $50,000 requires a 100% gain." }] },
  { id: 50, sectionId: 6, sectionTitle: "Risk Management", title: "Bankroll Management - Sizing Up and Down", description: "Learn when to increase and decrease your position sizes.", estimatedTime: 15, content: ["Start with minimum position sizes. Your first 50 trades should be about learning, not earning. Use 0.5% risk or less while you develop your skills.", "Size up gradually after consistent profitability. After 50 profitable trades at 0.5%, move to 0.75%. After 50 more, try 1%. Rushing this process leads to ruin.", "Size down during losing streaks. If you lose 3 in a row, cut risk to 0.5% until you win 3 in a row. This protects your capital during tough periods.", "Never 'bet the farm' on any single trade, no matter how confident you feel. The market humbles everyone eventually. Survival is the first priority.", "Your position size should be boring. If a trade makes you anxious, it's too big. If you can sleep peacefully, the size is right."], keyPoints: ["Start at 0.5% risk, gradually increase", "Size up after 50+ profitable trades at each level", "Size down during losing streaks", "If a trade makes you anxious, it's too big"], quiz: [{ question: "When should you increase position sizes?", options: ["After one big win", "After consistent profitability over 50+ trades", "When you feel confident", "At the start of each month"], correctAnswer: 1, explanation: "Position size increases should only come after demonstrated consistent profitability over a meaningful sample size (50+ trades)." }] },
  { id: 51, sectionId: 6, sectionTitle: "Risk Management", title: "The Psychology of Stops - Why Traders Remove Them", description: "Understand and overcome the urge to remove your safety net.", estimatedTime: 15, content: ["'It's so close to my stop, I'll give it more room' is the thought that precedes account destruction. Every trader has had it. Successful traders resist it.", "You set the stop based on chart structure and analysis. Moving it is based on HOPE and FEAR. Analysis beats emotion every time.", "Common rationalizations: 'My analysis is still valid' (if it were, price wouldn't be at your stop), 'Just a little more room' (where does it end?), 'It always comes back' (until it doesn't).", "The trader who removes stops has INFINITE risk. Without a stop, your loss is limited only by how far price can go against you - which can be far more than you imagine.", "Create a physical rule: Write 'I will never remove a stop' and tape it to your monitor. This is not a suggestion - it's survival."], keyPoints: ["Moving stops = emotion overriding analysis", "Removing stops = infinite, uncontrolled risk", "Every rationalization for removing stops is wrong", "Tape 'I will never remove a stop' to your monitor"], quiz: [{ question: "What risk does a trader without a stop loss face?", options: ["Normal risk", "Slightly higher risk", "Unlimited risk", "No risk"], correctAnswer: 2, explanation: "Without a stop loss, your potential loss is unlimited - bounded only by how far the market moves against you. This is how accounts get wiped out." }] },
  // Section 7: Advanced Concepts (Modules 52-59)
  { id: 52, sectionId: 7, sectionTitle: "Advanced Concepts", title: "Algorithmic Trading Basics", description: "Introduction to automated, rule-based trading strategies.", estimatedTime: 20, content: ["Algorithmic trading uses computer programs to execute trades based on predefined rules. If your strategy can be defined as exact rules, it can be automated.", "Advantages: No emotions, perfect execution, can trade 24/7, backtests easily, removes human error. The computer follows the rules perfectly every time.", "Disadvantages: Requires programming knowledge, can break with unusual market conditions, may overfit to historical data, needs ongoing maintenance.", "Simple strategies to automate first: MA crossover (buy when 20 MA crosses above 50 MA), RSI extreme (buy when RSI below 30), breakout (buy when price closes above 20-day high).", "Start with paper trading your algorithm. Run it for months before committing real capital. Many strategies that look great in backtests fail in live markets."], keyPoints: ["Algos execute rules without emotion", "Requires programming but removes human error", "Can overfit to historical data - beware", "Paper trade algorithms extensively before going live"], quiz: [{ question: "What's the biggest advantage of algorithmic trading?", options: ["Higher profits guaranteed", "No emotions in execution", "Lower costs", "Faster internet"], correctAnswer: 1, explanation: "Removing emotional decision-making is the primary advantage. The algorithm follows rules perfectly, never getting scared, greedy, or revenge trading." }] },
  { id: 53, sectionId: 7, sectionTitle: "Advanced Concepts", title: "Market Microstructure", description: "Understand order flow, market makers, and how markets really work.", estimatedTime: 20, content: ["Order flow is the stream of buy and sell orders hitting the market. Understanding order flow reveals what other traders are doing in real time.", "Market makers provide liquidity by always quoting both a bid and ask price. They profit from the spread. Without them, markets would be illiquid and chaotic.", "The order book shows all pending limit orders at each price level. Large orders at specific levels indicate strong support or resistance.", "High-frequency traders (HFT) account for 50-70% of stock market volume. They execute in microseconds, far faster than any human can react.", "As a retail trader, you compete against HFTs and institutions with massive advantages. Your edge is patience, flexibility, and the ability to wait for perfect setups."], keyPoints: ["Order flow reveals real-time buying/selling pressure", "Market makers provide liquidity via the spread", "Order book shows pending limit orders at each level", "Retail edge: patience and flexibility vs speed"], quiz: [{ question: "What advantage do retail traders have over HFT firms?", options: ["Faster execution", "More capital", "Patience and flexibility", "Better algorithms"], correctAnswer: 2, explanation: "Retail traders can wait indefinitely for perfect setups and have no obligation to trade. This patience and flexibility is an edge that HFTs don't have." }] },
  { id: 54, sectionId: 7, sectionTitle: "Advanced Concepts", title: "Dark Pools and HFT - What You're Up Against", description: "Learn about institutional advantages and how to level the playing field.", estimatedTime: 15, content: ["Dark pools are private exchanges where large institutional orders execute without appearing on public order books. About 40% of stock trades happen in dark pools.", "Payment for order flow: When you place an order through most brokers, it's routed to HFT firms who pay for the right to trade against you. They profit from the information.", "Front-running: HFTs see your order milliseconds before execution and can trade ahead of you, slightly worsening your fill. This costs retail traders billions annually.", "How to protect yourself: Use limit orders (not market), avoid trading the open (most chaotic), trade liquid stocks (tighter spreads), and don't chase momentum (HFTs are faster).", "Despite these disadvantages, retail traders can still be profitable. Institutions can't invest in small-cap stocks or be patient enough to wait weeks for setups. Use your advantages."], keyPoints: ["40% of trades happen in dark pools", "HFTs may trade against retail order flow", "Use limit orders to protect against front-running", "Retail edge: small-cap access and unlimited patience"], quiz: [{ question: "Why should retail traders use limit orders instead of market orders?", options: ["They're cheaper", "They protect against poor fills and front-running", "They execute faster", "They're required by law"], correctAnswer: 1, explanation: "Limit orders specify the maximum price you'll pay, protecting you from slippage and front-running by HFT firms." }] },
  { id: 55, sectionId: 7, sectionTitle: "Advanced Concepts", title: "Correlation Trading - Asset Relationships", description: "Use correlations between assets for confirmation and diversification.", estimatedTime: 15, content: ["Positive correlation: Assets that move together. Tech stocks correlate with NASDAQ. Altcoins correlate with Bitcoin. When one moves, the other follows.", "Negative correlation: Assets that move opposite. Gold often rises when stocks fall. The US dollar often moves opposite to Bitcoin.", "Using correlations: If MSFT breaks out but AAPL and GOOGL don't, the MSFT breakout might be weak. Correlated assets should confirm each other's moves.", "Correlation breaks down during extreme events. In a market crash, almost everything drops together regardless of normal correlations. Don't rely on correlation for crash protection.", "Track correlation to avoid concentrated risk. If you hold 5 positions that are all highly correlated, you effectively have one large position, not five diversified ones."], keyPoints: ["Positive correlation = move together", "Negative correlation = move opposite", "Use correlations for trade confirmation", "Correlations break down during crashes"], quiz: [{ question: "Why is holding 5 highly correlated positions risky?", options: ["Commissions are higher", "You effectively have one large undiversified position", "Correlated assets are always bad", "It requires too much monitoring"], correctAnswer: 1, explanation: "Highly correlated positions move together, so if one drops, they all drop. Five correlated positions behave like one big position, eliminating diversification benefits." }] },
  { id: 56, sectionId: 7, sectionTitle: "Advanced Concepts", title: "Volatility Trading - VIX and Options", description: "Understand volatility, the VIX fear gauge, and volatility strategies.", estimatedTime: 20, content: ["Volatility measures how much prices swing. High volatility = big moves. Low volatility = small moves. The VIX (CBOE Volatility Index) measures expected S&P 500 volatility.", "VIX below 15: Low volatility, calm markets. VIX 15-25: Normal volatility. VIX 25-35: High volatility, fear increasing. VIX above 35: Extreme fear, potential crash.", "High VIX = expensive options (higher premiums). Selling options in high VIX can be profitable but risky. Buying options in low VIX is cheaper but moves might not happen.", "Volatility mean-reverts: Periods of low volatility are followed by high volatility, and vice versa. You can position for this cycle.", "For beginners: Simply use VIX as a fear gauge. When VIX spikes above 30, be cautious with new positions. When VIX is calm below 15, normal strategies work well."], keyPoints: ["VIX measures market fear/expected volatility", "VIX > 30 = high fear, be cautious", "VIX < 15 = calm, normal trading conditions", "Volatility mean-reverts over time"], quiz: [{ question: "What does a VIX reading above 35 typically indicate?", options: ["Bull market ahead", "Extreme fear in the market", "Low volatility", "Options are cheap"], correctAnswer: 1, explanation: "VIX above 35 indicates extreme fear and expected high volatility. Markets are typically in or near a significant selloff." }] },
  { id: 57, sectionId: 7, sectionTitle: "Advanced Concepts", title: "Crypto On-Chain Analysis", description: "Read blockchain data to gain an edge in crypto trading.", estimatedTime: 20, content: ["On-chain analysis examines blockchain data to understand what participants are doing. Unlike stocks, blockchain transactions are public and transparent.", "Exchange inflows/outflows: Large amounts moving TO exchanges often precede selling. Large amounts moving FROM exchanges to wallets suggests accumulation (bullish).", "Whale watching: Track large wallets. When wallets holding 1,000+ BTC accumulate, it's bullish. When they send to exchanges, potential sell pressure ahead.", "MVRV ratio (Market Value to Realized Value): Compares current price to the average price at which all coins last moved. Above 3.5 = overvalued. Below 1.0 = undervalued.", "Funding rates in futures: Positive funding = longs paying shorts (too many longs, overheated). Negative funding = shorts paying longs (too many shorts, potential squeeze)."], keyPoints: ["Blockchain data is public and transparent", "Exchange inflows = potential selling; outflows = accumulation", "Whale movements can signal upcoming price action", "MVRV > 3.5 = overvalued; < 1 = undervalued"], quiz: [{ question: "What does large Bitcoin inflow to exchanges suggest?", options: ["Bullish signal", "Potential selling pressure ahead", "Nothing - it's random", "Mining activity"], correctAnswer: 1, explanation: "Large inflows to exchanges suggest holders are moving coins to sell. This is a bearish signal as it increases available supply on exchanges." }] },
  { id: 58, sectionId: 7, sectionTitle: "Advanced Concepts", title: "Tax Implications of Trading", description: "Understand the tax consequences of your trades.", estimatedTime: 15, content: ["Short-term capital gains (assets held < 1 year) are taxed as ordinary income (up to 37% in the US). Long-term gains (held > 1 year) have lower rates (0%, 15%, or 20%).", "Day traders and swing traders mostly pay short-term rates. This means roughly 30-37% of your profits go to taxes. Factor this into your profitability calculations.", "Wash sale rule: If you sell a stock at a loss and buy it back within 30 days, you can't deduct the loss on taxes. This affects traders who frequently trade the same assets.", "Crypto is taxed as property. Every trade (even crypto-to-crypto) is a taxable event. Yes, swapping BTC for ETH triggers a tax event. Track everything.", "Keep meticulous records: date, price, quantity, and type of every trade. Use tax software like TurboTax, CoinTracker, or work with a CPA who understands trading."], keyPoints: ["Short-term trades taxed as income (up to 37%)", "Wash sale rule: no loss deduction if rebought in 30 days", "Every crypto trade is a taxable event", "Keep meticulous records - use tax software or a CPA"], quiz: [{ question: "What is the wash sale rule?", options: ["You must wash your hands before trading", "Can't deduct a loss if you rebuy the same asset within 30 days", "You must sell all positions monthly", "Tax-free trading on Mondays"], correctAnswer: 1, explanation: "The wash sale rule prevents you from selling at a loss for the tax deduction while immediately rebuying the same asset. You must wait 30 days." }] },
  { id: 59, sectionId: 7, sectionTitle: "Advanced Concepts", title: "Transitioning to Real Money Trading", description: "When you're ready, how to make the leap from paper to real trading.", estimatedTime: 20, content: ["You're ready for real money when: 100+ paper trades completed, 60%+ win rate, profit factor above 2.0, consistent for 3+ months, and you can follow your rules without emotion.", "Start with 1/10th of your paper position sizes. If you traded $100K paper, start with $10K real. The psychological difference between paper and real is enormous.", "Psychology changes with real money. Every loss feels worse. Every win feels incredible. The emotions you managed in paper trading will be 10x stronger with real money.", "Choose a broker carefully: Low commissions, reliable execution, good charting tools, and regulatory protection (SIPC for stocks). For crypto: established exchanges with security track records.", "First real trade checklist: Small position, clear stop loss, minimum 1:2 R:R, follows your strategy rules exactly, you are calm and focused, and you're willing to lose the amount at risk."], keyPoints: ["Ready after 100+ profitable paper trades over 3+ months", "Start with 1/10th of paper position sizes", "Emotions are 10x stronger with real money", "Choose regulated brokers with good security"], quiz: [{ question: "When transitioning to real money, what size should you start with?", options: ["Same as paper trading", "1/10th of paper trading size", "All your savings", "Double paper trading size"], correctAnswer: 1, explanation: "Starting at 1/10th paper size accounts for the massive psychological difference between paper and real money trading while you adjust." }] },
];

export function getModuleById(id: number): ModuleData | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getModulesBySection(sectionId: number): ModuleData[] {
  return MODULES.filter((m) => m.sectionId === sectionId);
}

export function getSectionProgress(sectionId: number, completedModules: Set<number>): { completed: number; total: number } {
  const sectionModules = getModulesBySection(sectionId);
  const completed = sectionModules.filter((m) => completedModules.has(m.id)).length;
  return { completed, total: sectionModules.length };
}
