"use server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number = 15;
  private readonly windowMs: number = 60_000; // 1 minute

  isAllowed(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (Math.random() < 0.01) this.cleanup();

    if (!entry || now > entry.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { allowed: true };
    }

    if (entry.count >= this.maxRequests) {
      return { allowed: false, resetTime: entry.resetTime };
    }

    entry.count++;
    return { allowed: true };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

const ipRateLimiter = new RateLimiter();

export async function rateLimit(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, resetTime } = ipRateLimiter.isAllowed(ip);

  if (!allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Too many requests. Please try again later.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": Math.ceil(
            ((resetTime ?? Date.now()) - Date.now()) / 1000
          ).toString(),
        },
      }
    );
  }

  return null; // null means continue with the request
}
