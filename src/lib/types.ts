export type NavData = {
  date: string;
  nav: number;
};

export type Holding = {
  company: string;
  percentage: number;
};

export type PerformanceMetric = {
  metric: string;
  value: string;
  average: string;
};

export type PeerComparison = {
  fundName: string;
  peRatio: string;
  beta: number;
  sharpeRatio: number;
  upsideRatio: number;
  downsideRatio: number;
};

export type AssetAllocation = {
  name: string;
  value: number;
  fill: string;
};

export type FundDetails = {
  name: string;
  slug: string;
  aum: string;
  manager: string;
  investmentStrategy: {
    overview: string;
    oneYearReturn: string;
    threeYearReturn: string;
    fiveYearReturn: string;
  };
  navHistory: NavData[];
  holdings: Holding[];
  performanceMetrics: PerformanceMetric[];
  peerComparison: PeerComparison[];
  assetAllocation: AssetAllocation[];
  portfolioChanges: {
    sectorShifts: string;
    regulations: string;
    exitLoad: string;
  };
  strategicPositioning: string;
};

export const ASSET_CLASSES = ['Equity', 'Debt', 'Gold', 'Bonds', 'REITs', 'Commodities'] as const;
export type AssetClass = (typeof ASSET_CLASSES)[number];
