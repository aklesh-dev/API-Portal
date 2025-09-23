import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartBarLabelCustomSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        {/* Skeletons for CardTitle and CardDescription */}
        <Skeleton className="h-6 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-4">
        {/* Skeletons for multiple bars */}
        {[...Array(5)].map((_, i) => ( // Adjust the number of bars if your chart typically has more/fewer
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-[60px]" /> {/* For the table name label */}
            <Skeleton className="h-8 flex-1" /> {/* For the bar itself */}
            <Skeleton className="h-4 w-[40px]" /> {/* For the value label */}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* Skeletons for CardFooter content */}
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[40%]" />
      </CardFooter>
    </Card>
  );
}