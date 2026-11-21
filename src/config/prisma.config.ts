
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { Pool } from 'pg';
import { env } from "./.env.config.js";

const pool = new Pool ({
    connectionString: env.database_url,
})

const adapter = new PrismaPg(pool)

const globalErrorPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}
export const prisma = 
globalErrorPrisma.prisma ?? 
new PrismaClient({
    adapter,
})
if(env.node_environment !== "production"){
    globalErrorPrisma.prisma = prisma;
}