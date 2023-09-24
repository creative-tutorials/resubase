import { Skeleton } from "@/components/ui/skeleton";
export default function SkeletonLoader() {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-darkbg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-darkbg" />
          <Skeleton className="h-4 w-[200px] bg-darkbg" />
        </div>
      </div>
      ;
    </>
  );
}
