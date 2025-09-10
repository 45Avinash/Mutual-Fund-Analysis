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

const fundNames = Object.values(fundData).map(fund => fund.name).join(', ');

const prompt = ai.definePrompt({
  name: 'generateInvestmentPortfoliosPrompt',
  input: {schema: InvestmentProfileInputSchema},
  output: {schema: InvestmentPortfoliosOutputSchema},
  prompt: `You are a financial expert providing investment portfolio recommendations.

  Based on the user's investment profile, generate 4-5 diversified investment portfolios.
  Each portfolio should include a mix of mutual funds based on the user's asset allocation preferences.
  Consider the user's risk tolerance and investment period when creating the portfolios.

  You must select funds from the following list: ${fundNames}.

  User Investment Profile:
  Investment Amount: {{{investmentAmount}}}
  Expected Return: {{{expectedReturn}}}%
  Risk Tolerance: {{{riskTolerance}}}
  Investment Period: {{{investmentPeriod}}}
  Asset Allocation Preferences: {{{assetAllocationPreferences}}}

  Ensure that the generated portfolios are well-diversified and aligned with the user's preferences.

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
