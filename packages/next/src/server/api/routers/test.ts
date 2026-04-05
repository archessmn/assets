import { exec } from "node:child_process";
import util from "node:util";
import { getIO } from "@repo/lib/socket/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const _execAsync = util.promisify(exec);

export const testRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return {
      pong: true,
    };
  }),
});
