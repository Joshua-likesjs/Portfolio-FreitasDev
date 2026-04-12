import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Profile image skeleton */}
        <Skeleton className="w-28 h-28 rounded-full mb-6 bg-[#8A00C4]/20" />
        {/* Name skeleton */}
        <Skeleton className="h-12 w-72 rounded-md bg-[#8A00C4]/20 mb-3" />
        {/* Title skeleton */}
        <Skeleton className="h-6 w-56 rounded-md bg-[#8A00C4]/20 mb-6" />
        {/* CTA buttons skeleton */}
        <div className="flex gap-4">
          <Skeleton className="h-11 w-36 rounded-md bg-[#8A00C4]/20" />
          <Skeleton className="h-11 w-28 rounded-md bg-[#8A00C4]/20" />
        </div>
        {/* Scroll indicator skeleton */}
        <Skeleton className="mt-12 w-6 h-10 rounded-full bg-[#8A00C4]/20" />
      </div>

      {/* Section skeletons */}
      <div className="max-w-5xl mx-auto px-4 space-y-16 pb-20">
        {/* About section skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-32 rounded-md bg-[#8A00C4]/20 mx-auto" />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-full rounded-md bg-muted" />
              <Skeleton className="h-4 w-full rounded-md bg-muted" />
              <Skeleton className="h-4 w-3/4 rounded-md bg-muted" />
            </div>
            <Skeleton className="h-48 w-full md:w-64 rounded-xl bg-muted" />
          </div>
          {/* Skill bars skeleton */}
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-3 w-24 rounded-md bg-muted" />
                <Skeleton className="h-2 w-full rounded-full bg-muted" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats section skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-10 w-16 rounded-md bg-[#8A00C4]/20" />
              <Skeleton className="h-3 w-20 rounded-md bg-muted" />
            </div>
          ))}
        </div>

        {/* Projects section skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-36 rounded-md bg-[#8A00C4]/20 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-border p-4">
                <Skeleton className="h-40 w-full rounded-lg bg-muted" />
                <Skeleton className="h-5 w-2/3 rounded-md bg-muted" />
                <Skeleton className="h-3 w-full rounded-md bg-muted" />
                <Skeleton className="h-3 w-4/5 rounded-md bg-muted" />
                <div className="flex gap-2 pt-1">
                  <Skeleton className="h-5 w-16 rounded-full bg-muted" />
                  <Skeleton className="h-5 w-16 rounded-full bg-muted" />
                  <Skeleton className="h-5 w-20 rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline sections skeleton (Experience/Education) */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-40 rounded-md bg-[#8A00C4]/20 mx-auto" />
          <div className="space-y-8 max-w-2xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-4 w-4 rounded-full bg-[#8A00C4]/20 shrink-0" />
                  <Skeleton className="h-full w-0.5 bg-muted mt-1" />
                </div>
                <div className="flex-1 space-y-2 pb-6">
                  <Skeleton className="h-3 w-24 rounded-md bg-muted" />
                  <Skeleton className="h-5 w-48 rounded-md bg-muted" />
                  <Skeleton className="h-4 w-full rounded-md bg-muted" />
                  <Skeleton className="h-4 w-3/4 rounded-md bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact section skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-28 rounded-md bg-[#8A00C4]/20 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded-md bg-muted" />
              <Skeleton className="h-10 w-full rounded-md bg-muted" />
              <Skeleton className="h-10 w-full rounded-md bg-muted" />
              <Skeleton className="h-24 w-full rounded-md bg-muted" />
              <Skeleton className="h-10 w-full rounded-md bg-[#8A00C4]/20" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded-md bg-muted" />
              <Skeleton className="h-16 w-full rounded-md bg-muted" />
              <Skeleton className="h-16 w-full rounded-md bg-muted" />
              <Skeleton className="h-16 w-full rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
