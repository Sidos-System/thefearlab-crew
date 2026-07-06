import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background p-4 text-white lg:p-6">
      <div className="hidden min-h-[calc(100vh-3rem)] gap-6 lg:flex">
        <aside className="w-72 rounded-[24px] border border-border-soft bg-surface-1 p-5">
          <Skeleton className="h-12 w-44" />
          <div className="mt-10 space-y-3">
            {Array.from({ length: 7 }, (_, index) => (
              <Skeleton className="h-12" key={index} />
            ))}
          </div>
          <Skeleton className="mt-auto h-20" />
        </aside>

        <section className="flex-1 space-y-6">
          <div className="flex h-24 items-center justify-between rounded-[24px] border border-border-soft bg-surface-1 px-8">
            <div>
              <Skeleton className="h-8 w-52" />
              <Skeleton className="mt-3 h-4 w-72" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>

          <Skeleton className="h-[420px] rounded-[28px]" />
          <div className="grid gap-4 xl:grid-cols-5">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton className="h-44" key={index} />
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-5 lg:hidden">
        <div className="flex items-center justify-between">
          <Skeleton className="h-12 w-12" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-12 w-24" />
        </div>
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[440px] rounded-[28px]" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton className="h-36" key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
