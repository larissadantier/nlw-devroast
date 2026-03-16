"use client"

import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import NumberFlow from "@number-flow/react"

export function StatsMetrics() {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.roast.getStats.queryOptions())

  const totalRoasts = data?.totalRoasts ?? 0
  const avgScore = data?.avgScore ?? 0

  return (
    <div className="flex items-center justify-center gap-6">
      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
        <NumberFlow value={totalRoasts} willChange />
        {" "}codes roasted
      </span>
      <span className="text-zinc-500 dark:text-zinc-400">·</span>
      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
        avg score: <NumberFlow value={avgScore} willChange /> /10
      </span>
    </div>
  )
}
