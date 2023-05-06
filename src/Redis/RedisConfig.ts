import { Redis } from "ioredis";

export const redisToken = new Redis({
    host: "redis",
    port: 6379
});