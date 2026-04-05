"use client";

import { Button } from "@mantine/core";
import { signIn } from "@repo/lib/auth/client";

export default function SignInPage() {
  return (
    <>
      <Button
        onClick={() => {
          signIn.oauth2({ providerId: "kanidm", scopes: ["email"] });
        }}
      >
        Sign In with Kanidm
      </Button>
    </>
  );
}
