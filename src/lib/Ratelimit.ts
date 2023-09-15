import { Ratelimit } from "@upstash/ratelimit"; 
import { Redis } from "@upstash/redis"; 
export const RateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit",
  });