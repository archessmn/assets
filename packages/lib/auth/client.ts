import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const {
  signIn,
  signOut,
  signUp,
  useSession: useBetterAuthSession,
  $Infer: { Session: AuthClientSession },
} = createAuthClient({
  plugins: [genericOAuthClient()],
});
