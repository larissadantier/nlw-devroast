import { initTRPC } from "@trpc/server"
import { cache } from "react"
import { db } from "@/db"

export type Db = typeof db

export interface Context {
  db: Db
}

export const createTRPCContext = cache(async (): Promise<Context> => {
  return { db }
})

const t = initTRPC.context<Context>().create()

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
