import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartPieInteractiveSkeleton() {
  return (
    <Card className="flex flex-col bg-white/90">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid flex-1 gap-1">
          {/* Skeletons for the title and description */}
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        {/* Skeleton for the Select component */}
        <Skeleton className="h-7 w-[150px] rounded-lg" />
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        {/* Skeleton for the Pie Chart */}
        <div className="mx-auto aspect-square w-full max-w-[300px] flex items-center justify-center">
          <Skeleton className="h-[250px] w-[250px] rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}