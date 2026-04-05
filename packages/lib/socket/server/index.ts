import { Emitter } from "@socket.io/redis-emitter";
import { Redis } from "ioredis";
import "server-only";

import type { Server } from "socket.io";

export const globalThisForIO = globalThis as unknown as { io: Server };

export const getIO = async () =>
  (globalThis as unknown as { emitter?: Emitter }).emitter ??
  (async () => {
    const redis = new Redis();
    await redis.connect();
    const emitter = new Emitter(redis);
    (globalThis as unknown as { emitter?: Emitter }).emitter = emitter;
    return emitter;
  })();
