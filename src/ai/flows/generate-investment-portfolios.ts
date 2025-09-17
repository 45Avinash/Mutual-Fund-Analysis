'use server';

/**
 * @fileOverview Generates diversified investment portfolios based on user input.
 *
 * - generateInvestmentPortfolios - A function that generates investment portfolios.
 * - InvestmentProfileInput - The input type for the generateInvestmentPortfolios function.
 * - InvestmentPortfoliosOutput - The return type for the generateInvestmentPortfolios function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { fundData } from '@/lib/fund-data';

const InvestmentProfileInputSchema = z.object({
  investmentAmount: z.number().describe('The amount the user wants to invest.'),
  expectedReturn: z.number().describe('The expected return on investment (as a percentage).'),
  riskTolerance: z.enum(['low', 'medium', 'high']).describe('The risk tolerance of the user.'),
  investmentPeriod: z
    .enum(['lessThanOneYear', 'oneToFiveYears', 'moreThanFiveYears'])
    .describe('The investment period.'),
  assetAllocationPreferences: z
    .string()
    .describe(
      'Comma-separated list of asset allocation preferences (e.g., gold, commodity, equity, debt, reits, bond)'
    ),
});
export type InvestmentProfileInput = z.infer<typeof InvestmentProfileInputSchema>;

const InvestmentPortfolioSchema = z.object({
  portfolioName: z.string().describe('The name of the portfolio.'),
  description: z.string().describe('A description of the portfolio strategy.'),
  investments: z.array(
    z.object({
      fundName: z.string().describe('The name of the mutual fund.'),
      assetClass: z.string().describe('The asset class of the mutual fund.'),
      percentage: z.number().describe('The percentage of the investment allocated to this fund.'),
    })
  ),
});

const InvestmentPortfoliosOutputSchema = z.object({
  portfolios: z.array(InvestmentPortfolioSchema).describe('An array of investment portfolios.'),
});
export type InvestmentPortfoliosOutput = z.infer<typeof InvestmentPortfoliosOutputSchema>;

export async function generateInvestmentPortfolios(
  input: InvestmentProfileInput
): Promise<InvestmentPortfoliosOutput> {
  return generateInvestmentPortfoliosFlow(input);
}

const fundDetails = Object.values(fundData)
  .map(
    (fund) => `
- Fund Name: ${fund.name}
  Manager: ${fund.manager}
  Strategy: ${fund.investmentStrategy.overview}
  1Y Return: ${fund.investmentStrategy.oneYearReturn}
  3Y Return: ${fund.investmentStrategy.threeYearReturn}
  5Y Return: ${fund.investmentStrategy.fiveYearReturn}
  Asset Classes: ${fund.assetAllocation.map((a) => a.name).join(', ')}
`
  )
  .join('');

const prompt = ai.definePrompt({
  name: 'generateInvestmentPortfoliosPrompt',
  input: {schema: InvestmentProfileInputSchema},
  output: {schema: InvestmentPortfoliosOutputSchema},
  prompt: `You are a financial expert providing investment portfolio recommendations.

  Based on the user's investment profile, generate 3 diversified investment portfolios.
  Each portfolio should include a mix of mutual funds based on the user's asset allocation preferences.
  Consider the user's risk tolerance, investment period, and expected return when creating the portfolios.

  Here is the list of available funds and their details:
  ${fundDetails}

  You MUST select funds from the list above. Do not invent funds.
  The 'assetClass' in your response for each investment MUST be one of the asset classes associated with the chosen fund from the list above.

  User Investment Profile:
  - Investment Amount: {{{investmentAmount}}}
  - Expected Annual Return: {{{expectedReturn}}}%
  - Risk Tolerance: {{{riskTolerance}}}
  - Investment Period: {{{investmentPeriod}}}
  - Asset Allocation Preferences: {{{assetAllocationPreferences}}}

  Generate a unique description for each portfolio that explains the reasoning behind the fund selection and how it aligns with the user's profile. Ensure the generated portfolios are well-diversified and strictly aligned with the user's preferences.

  Output the portfolios in a JSON format.
  `,
});

const generateInvestmentPortfoliosFlow = ai.defineFlow(
  {
    name: 'generateInvestmentPortfoliosFlow',
    inputSchema: InvestmentProfileInputSchema,
    outputSchema: InvestmentPortfoliosOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
