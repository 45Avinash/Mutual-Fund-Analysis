import { FundDetails } from './types';

const navHistorySample = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (30 - i));
  return {
    date: date.toISOString().split('T')[0],
    nav: 100 + i * Math.sin(i / 2) * 5 + Math.random() * 5,
  };
});

export const fundData: Record<string, FundDetails> = {
  'nippon-india-large-cap-fund': {
    name: 'Nippon India Large Cap Fund',
    slug: 'nippon-india-large-cap-fund',
    aum: '₹25,678 Cr',
    manager: 'Shailesh Raj Bhan',
    investmentStrategy: {
      overview:
        'The fund primarily invests in large-cap stocks, aiming for long-term capital appreciation by picking companies with sustainable growth potential and strong management.',
      oneYearReturn: '28.5%',
      threeYearReturn: '15.2%',
      fiveYearReturn: '17.8%',
    },
    navHistory: navHistorySample.map(d => ({ ...d, nav: d.nav * 1.2 })),
    holdings: [
      { company: 'HDFC Bank Ltd.', percentage: 9.8 },
      { company: 'ICICI Bank Ltd.', percentage: 8.5 },
      { company: 'Infosys Ltd.', percentage: 7.2 },
      { company: 'Reliance Industries Ltd.', percentage: 6.5 },
      { company: 'Tata Consultancy Services Ltd.', percentage: 5.1 },
    ],
    performanceMetrics: [
      { metric: 'Alpha', value: '2.1%', average: '1.5%' },
      { metric: 'Beta', value: '0.95', average: '1.0' },
      { metric: 'Standard Deviation', value: '18.5%', average: '19.2%' },
      { metric: 'Sharpe Ratio', value: '0.8', average: '0.7' },
    ],
    peerComparison: [
        { fundName: 'HDFC Top 100', peRatio: '26.1', beta: 0.98, sharpeRatio: 0.75, upsideRatio: 85, downsideRatio: 90 },
        { fundName: 'ICICI Pru Bluechip', peRatio: '27.5', beta: 0.96, sharpeRatio: 0.82, upsideRatio: 90, downsideRatio: 88 },
        { fundName: 'SBI BlueChip Fund', peRatio: '25.9', beta: 0.94, sharpeRatio: 0.78, upsideRatio: 88, downsideRatio: 85 },
    ],
    assetAllocation: [
      { name: 'Equity', value: 95, fill: 'var(--color-chart-1)' },
      { name: 'Debt', value: 3, fill: 'var(--color-chart-2)' },
      { name: 'Cash', value: 2, fill: 'var(--color-chart-3)' },
    ],
    portfolioChanges: {
      sectorShifts: 'Increased allocation to financial services and reduced exposure to IT in the last quarter.',
      regulations: 'Fully compliant with SEBI regulations on large-cap fund allocations.',
      exitLoad: '1% for redemption within 1 year.',
    },
    strategicPositioning: 'Positioned to capture growth in top Indian companies, with a focus on stable earnings and market leadership.',
  },
  'hdfc-gold-fund': {
    name: 'HDFC Gold Fund',
    slug: 'hdfc-gold-fund',
    aum: '₹9,876 Cr',
    manager: 'Priya Sharma',
    investmentStrategy: {
      overview: 'This fund invests in physical gold and gold-related instruments, serving as a hedge against inflation and market volatility.',
      oneYearReturn: '15.1%',
      threeYearReturn: '8.4%',
      fiveYearReturn: '12.2%',
    },
    navHistory: navHistorySample.map(d => ({ ...d, nav: d.nav * 0.8 })),
    holdings: [
        { company: 'Gold Bullion', percentage: 99.5 },
        { company: 'Cash & Equivalents', percentage: 0.5 },
    ],
    performanceMetrics: [
      { metric: 'Alpha', value: '0.5%', average: '0.2%' },
      { metric: 'Beta', value: '0.1', average: '0.1' },
      { metric: 'Standard Deviation', value: '12.1%', average: '12.5%' },
      { metric: 'Sharpe Ratio', value: '0.6', average: '0.55' },
    ],
    peerComparison: [
        { fundName: 'Nippon India Gold Savings', peRatio: 'N/A', beta: 0.11, sharpeRatio: 0.58, upsideRatio: 102, downsideRatio: 98 },
        { fundName: 'SBI Gold Fund', peRatio: 'N/A', beta: 0.09, sharpeRatio: 0.61, upsideRatio: 100, downsideRatio: 100 },
    ],
    assetAllocation: [
      { name: 'Gold', value: 99, fill: 'var(--color-chart-2)' },
      { name: 'Cash', value: 1, fill: 'var(--color-chart-3)' },
    ],
    portfolioChanges: {
      sectorShifts: 'N/A as it is a single-commodity fund.',
      regulations: 'Adheres to SEBI guidelines for gold ETFs and gold funds.',
      exitLoad: '1% for redemption within 1 year.',
    },
    strategicPositioning: 'Offers a simple and efficient way to invest in gold, providing portfolio diversification.',
  },
  'parag-parikh-flexi-cap-fund': {
    name: 'Parag Parikh Flexi Cap Fund',
    slug: 'parag-parikh-flexi-cap-fund',
    aum: '₹66,182 Cr',
    manager: 'Rajeev Thakkar',
    investmentStrategy: {
      overview: 'A diversified equity scheme with a unique blend of domestic and international equities. The fund follows a value investing philosophy and is known for its low portfolio turnover.',
      oneYearReturn: '38.6%',
      threeYearReturn: '20.9%',
      fiveYearReturn: '23.8%',
    },
    navHistory: navHistorySample.map(d => ({ ...d, nav: d.nav * 1.5 })),
    holdings: [
      { company: 'HDFC Bank Ltd.', percentage: 7.9 },
      { company: 'Alphabet Inc. (Google)', percentage: 6.8 },
      { company: 'Bajaj Holdings & Investment Ltd.', percentage: 6.5 },
      { company: 'ITC Ltd.', percentage: 5.4 },
      { company: 'Microsoft Corporation', percentage: 5.2 },
    ],
    performanceMetrics: [
      { metric: 'Alpha', value: '7.5%', average: '3.1%' },
      { metric: 'Beta', value: '0.78', average: '0.95' },
      { metric: 'Standard Deviation', value: '15.2%', average: '18.0%' },
      { metric: 'Sharpe Ratio', value: '1.3', average: '0.9' },
    ],
    peerComparison: [
        { fundName: 'Quant Flexi Cap Fund', peRatio: '22.5', beta: 0.85, sharpeRatio: 1.4, upsideRatio: 120, downsideRatio: 80 },
        { fundName: 'HDFC Flexi Cap Fund', peRatio: '28.1', beta: 0.92, sharpeRatio: 1.0, upsideRatio: 95, downsideRatio: 90 },
    ],
    assetAllocation: [
      { name: 'Indian Equity', value: 70, fill: 'var(--color-chart-1)' },
      { name: 'Foreign Equity', value: 20, fill: 'var(--color-chart-4)' },
      { name: 'Debt', value: 8, fill: 'var(--color-chart-2)' },
      { name: 'Cash', value: 2, fill: 'var(--color-chart-3)' },
    ],
    portfolioChanges: {
      sectorShifts: 'Maintains a diversified portfolio with significant allocation to global tech giants. Recently increased stakes in domestic financial services.',
      regulations: 'Manages foreign allocation within SEBI prescribed limits.',
      exitLoad: '2% for redemption within 1 year, 1% for redemption between 1 and 2 years.',
    },
    strategicPositioning: 'Uniquely positioned with global diversification, offering a hedge against domestic market downturns and access to global tech growth.',
  },
  'quant-small-cap-fund': {
    name: 'Quant Small Cap Fund',
    slug: 'quant-small-cap-fund',
    aum: '₹21,243 Cr',
    manager: 'Ankit Pande',
    investmentStrategy: {
        overview: 'Follows a dynamic and aggressive investment style, frequently churning the portfolio to capitalize on market momentum. Focuses on identifying undervalued small-cap stocks with high growth potential.',
        oneYearReturn: '67.8%',
        threeYearReturn: '44.5%',
        fiveYearReturn: '48.9%',
    },
    navHistory: navHistorySample.map(d => ({ ...d, nav: d.nav * 2.1 })),
    holdings: [
        { company: 'Reliance Industries Ltd.', percentage: 9.5 },
        { company: 'Jio Financial Services Ltd.', percentage: 6.8 },
        { company: 'IRB Infrastructure Developers', percentage: 4.1 },
        { company: 'Adani Power Ltd.', percentage: 3.5 },
        { company: 'HDFC Bank Ltd.', percentage: 3.2 },
    ],
    performanceMetrics: [
        { metric: 'Alpha', value: '15.2%', average: '5.5%' },
        { metric: 'Beta', value: '0.88', average: '0.92' },
        { metric: 'Standard Deviation', value: '22.5%', average: '24.1%' },
        { metric: 'Sharpe Ratio', value: '1.9', average: '1.1' },
    ],
    peerComparison: [
        { fundName: 'Nippon India Small Cap', peRatio: '30.1', beta: 0.90, sharpeRatio: 1.5, upsideRatio: 110, downsideRatio: 95 },
        { fundName: 'SBI Small Cap Fund', peRatio: '32.4', beta: 0.85, sharpeRatio: 1.6, upsideRatio: 105, downsideRatio: 90 },
    ],
    assetAllocation: [
        { name: 'Equity', value: 96, fill: 'var(--color-chart-1)' },
        { name: 'Debt', value: 1, fill: 'var(--color-chart-2)' },
        { name: 'Cash', value: 3, fill: 'var(--color-chart-3)' },
    ],
    portfolioChanges: {
        sectorShifts: 'Highly dynamic. Recently increased allocation to infrastructure and energy sectors.',
        regulations: 'Adheres to SEBI norms for small-cap funds.',
        exitLoad: '1% for redemption within 1 year.',
    },
    strategicPositioning: 'Aims for high alpha through active, momentum-based trading. Suitable for investors with a very high risk appetite.',
  },
};
