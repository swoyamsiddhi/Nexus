import IORedis from "ioredis";

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error("REDIS_URL is not defined");
};

const globalForRedis = globalThis as unknown as {
    redis: IORedis | undefined;
};

export const redis =
    globalForRedis.redis ??
    new IORedis(getRedisUrl(), {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
    });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

// =====================
// Cache helpers
// =====================

export async function getCache<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;
    try {
        return JSON.parse(data) as T;
    } catch {
        return null;
    }
}

export async function setCache<T>(
    key: string,
    value: T,
    ttlSeconds = 60 * 5 // 5 minutes default
): Promise<void> {
    await redis.setex(key, ttlSeconds, JSON.stringify(value));
}

export async function deleteCache(key: string): Promise<void> {
    await redis.del(key);
}

export async function deleteCachePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
        await redis.del(...keys);
    }
}

// TTL constants (seconds)
export const CACHE_TTL = {
    SHORT: 60, // 1 min
    MEDIUM: 60 * 5, // 5 min
    LONG: 60 * 60, // 1 hour
    DAY: 60 * 60 * 24,
} as const;

// Cache key namespaces
export const CACHE_KEYS = {
    club: (id: string) => `club:${id}`,
    clubs: (page: number) => `clubs:page:${page}`,
    clubMembers: (clubId: string) => `club:${clubId}:members`,
    userProfile: (userId: string) => `user:${userId}:profile`,
    notifications: (userId: string) => `user:${userId}:notifications`,
    event: (id: string) => `event:${id}`,
} as const;
