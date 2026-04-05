import { db } from "@repo/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";
import { env } from "../env";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  telemetry: {
    enabled: false,
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "kanidm",
          clientId: env.OAUTH_CLIENT_ID,
          clientSecret: env.OAUTH_CLIENT_SECRET,
          discoveryUrl: env.OAUTH_DISCOVERY_URL,
          pkce: true,
        },
      ],
    }),
  ],
});
