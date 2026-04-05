"use client";

import { useAppForm } from "@/app/_components/form";
import { api } from "@/trpc/react";
import { Button } from "@mantine/core";
import { signIn } from "@repo/lib/auth/client";
import dayjs from "dayjs";
import z from "zod";

export default function SignInPage() {
  const schema = z.object({ email: z.email(), password: z.string() });

  const form = useAppForm({
    validators: {
      onChange: schema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      signIn.email({ email: value.email, password: value.password });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppField name="email">
        {(field) => <field.TextField label="Email" />}
      </form.AppField>

      <form.AppField name="password">
        {(field) => <field.PasswordField label="Password" />}
      </form.AppField>

      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}
