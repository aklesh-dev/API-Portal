import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTableLists } from "@/hooks/useHooks";
import { ChartBarLabelCustomSkeleton } from "./BarChartSkeleton";

export const description = "A bar chart with a custom label";

const tableSources = [
  { name: "BlackList", endpoint: "blacklist" },
  { name: "Company", endpoint: "company" },
  { name: "License", endpoint: "license" },
  { name: "NID", endpoint: "nid" },
  { name: "PAN", endpoint: "pan" },
];

export function ChartBarLabelCustom() {
  const tableEndpoints = React.useMemo(
    () => tableSources.map((source) => source.endpoint),
    []
  );

  const queryResults = useTableLists(tableEndpoints);

  // Check for loading and error states
  const isLoading = queryResults.some((query) => query.isLoading);
  const isError = queryResults.some((query) => query.isError);

  // Memoized data processing
  const { chartData, chartConfig } = React.useMemo(() => {
    if (isLoading || isError) {
      return { chartData: [], chartConfig: {} };
    }

    // Map fetched data to the format required by Recharts
    const data = tableSources.map((source, index) => ({
      name: source.name,
      total: queryResults[index]?.data?.recordsTotal || 0,
      // fill: `var(--chart-${index + 1})`,
      fill: `var(--chart-2)`,
    }));

    // Dynamically create the chart configuration for colors
    const config: ChartConfig = data.reduce((acc, item, index) => {
      acc[item.name.toLowerCase()] = {
        label: item.name,
        color: `var(--chart-${index + 1})`,
      };
      return acc;
    }, {} as ChartConfig);

    // Add the label config for the bar chart's labels
    config.label = { color: "var(--background)" };

    return { chartData: data, chartConfig: config };
  }, [queryResults, isLoading, isError]);

  if (isLoading) {
    return <ChartBarLabelCustomSkeleton />;
  }

  if (isError) {
    return (
      <Card className="p-4 text-center text-red-600">Failed to load data.</Card>
    );
  }

  return (
    <Card className="bg-white/80">
      <CardHeader>
        <CardTitle>Total Records by Table</CardTitle>
        <CardDescription>
          Count of records for each table in the database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 40, left: 16 }}
          >
            <CartesianGrid horizontal={false} />

            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
            />

            <XAxis dataKey="total" type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar
              dataKey="total"
              layout="vertical"
              fill="var(--color-total)"
              radius={4}
            >
              <LabelList
                dataKey="total"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total records for all tables
        </div>
        <div className="text-muted-foreground leading-none">
          {`Total: ${chartData
            .reduce((sum, item) => sum + item.total, 0)
            .toLocaleString()}`}
        </div>
      </CardFooter>
    </Card>
  );
}
