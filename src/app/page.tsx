"use client";

import { useState } from "react";
import { InvestmentProfileForm } from "@/components/investment/investment-profile-form";
import { PortfolioResults } from "@/components/investment/portfolio-results";
import type {
  InvestmentPortfoliosOutput,
  InvestmentProfileInput,
} from "@/ai/flows/generate-investment-portfolios";
import { generateInvestmentPortfolios } from "@/ai/flows/generate-investment-portfolios";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";

export default function Home() {
  const [portfolios, setPortfolios] =
    useState<InvestmentPortfoliosOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: InvestmentProfileInput) => {
    setIsLoading(true);
    setError(null);
    setPortfolios(null);
    try {
      const result = await generateInvestmentPortfolios(data);
      if (!result || !result.portfolios || result.portfolios.length === 0) {
        throw new Error("AI failed to generate portfolios.");
      }
      setPortfolios(result);
    } catch (e: any) {
      const errorMessage =
        e.message || "Failed to generate portfolios. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = (importedPortfolios: InvestmentPortfoliosOutput) => {
    setPortfolios(importedPortfolios);
    setError(null);
    setIsLoading(false);
    toast({
      title: 'Success',
      description: 'Portfolios imported successfully.',
    });
  };

  return (
    <>
      <Header onImport={handleImport} />
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to FundForecaster
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Your personalized AI-powered investment portfolio generator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <InvestmentProfileForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8">
            <PortfolioResults
              portfolios={portfolios}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </>
  );
}
