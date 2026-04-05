import { Button, Group } from "@mantine/core";
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext, useFormContext } from "./context";
import { DateField, PasswordField, TextField } from "./fields";

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Group>
          <Button disabled={isSubmitting} ml={"auto"} mt={16} type="submit">
            {label}
          </Button>
        </Group>
      )}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    DateField,
    PasswordField,
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
