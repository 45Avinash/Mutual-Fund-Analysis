"use client";

import type { InvestmentPortfoliosOutput } from "@/ai/flows/generate-investment-portfolios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { AlertCircle, FileText, Download } from "lucide-react";
import { Button } from "../ui/button";

type PortfolioResultsProps = {
  portfolios: InvestmentPortfoliosOutput | null;
  isLoading: boolean;
  error: string | null;
};

const SkeletonLoader = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </CardContent>
  </Card>
);

const EmptyState = () => (
  <Card className="flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
    <CardTitle className="font-headline text-2xl">
      Ready for Your Results?
    </CardTitle>
    <CardDescription className="mt-2 max-w-md mx-auto">
      Fill out your investment profile, and your personalized portfolio
      suggestions will appear right here.
    </CardDescription>
  </Card>
);

export function PortfolioResults({
  portfolios,
  isLoading,
  error,
}: PortfolioResultsProps) {
  const handleSave = () => {
    if (!portfolios) return;
    const dataStr = JSON.stringify(portfolios, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'portfolios.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };


  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Generation Failed</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!portfolios) {
    return <EmptyState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Generated Portfolios
        </CardTitle>
        <CardDescription>
          Here are some portfolio suggestions based on your profile. Click on a
          fund to see more details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-0">
          {portfolios.portfolios.map((portfolio, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-headline text-lg">
                {portfolio.portfolioName}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  {portfolio.description}
                </p>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fund Name</TableHead>
                        <TableHead>Asset Class</TableHead>
                        <TableHead className="text-right">Allocation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolio.investments.map((investment, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            <Link
                              href={`/fund/${slugify(investment.fundName)}`}
                              className="text-primary hover:underline"
                            >
                              {investment.fundName}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {investment.assetClass}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {investment.percentage}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} variant="outline" size="sm">
            <Download className="mr-2" />
            Save Portfolios
        </Button>
      </CardFooter>
    </Card>
  );
}
