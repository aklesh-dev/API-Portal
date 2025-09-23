import React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTableLists } from "@/hooks/useHooks";
import { ChartPieInteractiveSkeleton } from "./PieChartSkeleton";

export const description = "An interactive pie chart of voter lists";

// Define the data sources outside the component
const tableSources = [
  { name: "Total Voters", endpoint: "voterlists" },
  { name: "Bagmati", endpoint: "voters_lists_bagmati" },
  { name: "Gandaki", endpoint: "voters_lists_gandaki" },
  { name: "Karnali", endpoint: "voters_lists_karnali" },
  { name: "Koshi", endpoint: "voters_lists_koshi" },
  { name: "Lumbini", endpoint: "voters_lists_lumbini" },
  { name: "Madhesh", endpoint: "voters_lists_madesh" },
  { name: "Sudurpashchim", endpoint: "voters_lists_sudurpashchim" },
];

export function ChartPieInteractive() {
  const id = "pie-interactive-voters";

  // 1. DATA FETCHING
  // Get all endpoint slugs to pass to the hook
  const tableEndpoints = React.useMemo(
    () => tableSources.map((source) => source.endpoint),
    []
  );
  const queryResults = useTableLists(tableEndpoints); 

  const isLoading = queryResults.some((query) => query.isLoading);
  const isError = queryResults.some((query) => query.isError);

  // 2. DATA PROCESSING (Memoized for performance)
  const { chartData, chartConfig } = React.useMemo(() => {
    // If data isn't ready, return empty structures
    if (isLoading || isError || !queryResults) {
      return { chartData: [], chartConfig: {} };
    }

    // Map query results to the format needed for the chart
    const data = tableSources.map((source, index) => ({
      name: source.name,
      total: queryResults[index]?.data?.recordsTotal || 0,
      endpoint: source.endpoint,
      fill: `var(--chart-${index + 1})`,
    }));

    // Dynamically create the chart configuration for colors and labels
    const config: ChartConfig = data.reduce((acc, item) => {
      acc[item.endpoint] = {
        label: item.name,
        color: item.fill,
      };
      return acc;
    }, {} as ChartConfig);
    config.total = { label: "Voters" }; // Add a default config for the tooltip

    return { chartData: data, chartConfig: config };
  }, [queryResults, isLoading, isError]);

  // 3. UI STATE MANAGEMENT
  const [activeItemName, setActiveItemName] = React.useState<string | null>(
    null
  );

  // Set the initial active item once data is loaded
  React.useEffect(() => {
    if (chartData.length > 0 && !activeItemName) {
      setActiveItemName(chartData[0].name);
    }
  }, [chartData, activeItemName]);

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.name === activeItemName),
    [activeItemName, chartData]
  );

  // 4. RENDER LOGIC
  if (isLoading) {
    return <ChartPieInteractiveSkeleton />;
  }

  if (isError) {
    return (
      <Card className="p-4 text-center text-red-600">
        Something went wrong!
      </Card>
    );
  }

  return (
    <Card data-chart={id} className="flex flex-col bg-white/80">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid flex-1 gap-1">
          <CardTitle>Voter Distribution</CardTitle>
          <CardDescription>
            Total voters by province as of today
          </CardDescription>
        </div>
        <Select value={activeItemName ?? ""} onValueChange={setActiveItemName}>
          <SelectTrigger
            className="h-7 w-[150px] rounded-lg pl-2.5"
            aria-label="Select a province"
          >
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {chartData.map((item) => (
              <SelectItem
                key={item.name}
                value={item.name}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-xs"
                    style={{ backgroundColor: item.fill }}
                  />
                  {item.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox &&
                    activeIndex !== -1
                  ) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {chartData[activeIndex].total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Voters
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
