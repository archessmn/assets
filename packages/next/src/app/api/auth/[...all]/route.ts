import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@repo/lib/auth";

export const { GET, POST } = toNextJsHandler(auth);
