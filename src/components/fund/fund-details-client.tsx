"use client";

import type { FundDetails } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, User, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type FundDetailsClientProps = {
  fund: FundDetails;
};

const chartConfig = {
  nav: {
    label: "NAV",
    color: "hsl(var(--chart-1))",
  },
};

export function FundDetailsClient({ fund }: FundDetailsClientProps) {
  const assetAllocationChartConfig = fund.assetAllocation.reduce(
    (acc, item) => {
      acc[item.name.toLowerCase()] = { label: item.name, color: item.fill };
      return acc;
    },
    {} as any
  );

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div>
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolios
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold">{fund.name}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>AUM: {fund.aum}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Fund Manager: {fund.manager}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">NAV History</CardTitle>
          <CardDescription>
            Historical movement of the Net Asset Value (NAV).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <ResponsiveContainer>
              <AreaChart data={fund.navHistory}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={["dataMin - 10", "dataMax + 10"]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="nav"
                  type="natural"
                  fill="hsl(var(--chart-1) / 0.2)"
                  stroke="hsl(var(--chart-1))"
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="strategy">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="comparison">Peer Comparison</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="changes">Portfolio Changes</TabsTrigger>
        </TabsList>

        <TabsContent value="strategy" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Investment Philosophy & Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Fund Overview</h3>
                <p className="text-muted-foreground">
                  {fund.investmentStrategy.overview}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Historical Returns</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">1-Year Return</p>
                    <p className="text-2xl font-bold text-accent-foreground">
                      {fund.investmentStrategy.oneYearReturn}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">3-Year Return (CAGR)</p>
                    <p className="text-2xl font-bold text-accent-foreground">
                      {fund.investmentStrategy.threeYearReturn}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">5-Year Return (CAGR)</p>
                    <p className="text-2xl font-bold text-accent-foreground">
                      {fund.investmentStrategy.fiveYearReturn}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Performance Metrics Analysis
              </CardTitle>
              <CardDescription>
                Key risk and return metrics compared to category average.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Fund Value</TableHead>
                    <TableHead>Category Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fund.performanceMetrics.map((metric) => (
                    <TableRow key={metric.metric}>
                      <TableCell className="font-medium">
                        {metric.metric}
                      </TableCell>
                      <TableCell>{metric.value}</TableCell>
                      <TableCell>{metric.average}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Comparative Analysis vs Peers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fund Name</TableHead>
                    <TableHead>P/E Ratio</TableHead>
                    <TableHead>Beta</TableHead>
                    <TableHead>Sharpe Ratio</TableHead>
                    <TableHead>Upside Ratio</TableHead>
                    <TableHead>Downside Ratio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fund.peerComparison.map((peer) => (
                    <TableRow key={peer.fundName}>
                      <TableCell className="font-medium">
                        {peer.fundName}
                      </TableCell>
                      <TableCell>{peer.peRatio}</TableCell>
                      <TableCell>{peer.beta}</TableCell>
                      <TableCell>{peer.sharpeRatio}</TableCell>
                      <TableCell>{peer.upsideRatio}</TableCell>
                      <TableCell>{peer.downsideRatio}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="mt-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={assetAllocationChartConfig}
                  className="h-64 w-full"
                >
                  <ResponsiveContainer>
                    <PieChart>
                      <Tooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={fund.assetAllocation}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                      />
                      <ChartLegend
                        content={<ChartLegendContent nameKey="name" />}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Top 5 Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead className="text-right">Allocation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fund.holdings.slice(0, 5).map((holding) => (
                      <TableRow key={holding.company}>
                        <TableCell className="font-medium">
                          {holding.company}
                        </TableCell>
                        <TableCell className="text-right">
                          {holding.percentage}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="changes" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Portfolio Changes & Strategy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">Recent Portfolio Changes</h3>
                        <p className="text-muted-foreground">{fund.portfolioChanges.sectorShifts}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-2">Strategic Positioning</h3>
                        <p className="text-muted-foreground">{fund.strategicPositioning}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Key Constraints & Exit Load</h3>
                        <p className="text-muted-foreground">SEBI Regulations: {fund.portfolioChanges.regulations}</p>
                        <p className="text-muted-foreground mt-1">Exit Load: {fund.portfolioChanges.exitLoad}</p>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
