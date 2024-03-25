import redis from 'redis';

// Create Redis client
export const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD, // Add the Redis password
    // Add any other Redis configurations as needed
  } as any); // Cast options to any
  