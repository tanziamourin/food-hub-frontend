"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: schema },

    onSubmit: async ({ value }) => {
      const t = toast.loading("Logging in...");

      const { error } = await authClient.signIn.email(value);
      if (error) {
        toast.error(error.message, { id: t });
        return;
      }

      // fetch profile (optional but fine)
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Failed to fetch profile", { id: t });
        return;
      }

      const json = await res.json();
      const user = json.data;

      if (!user) {
        toast.error("User not found", { id: t });
        return;
      }

      toast.success("Login success", { id: t });

      
      router.replace("/dashboard");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="email">
        {(f) => (
          <Input
            placeholder="Email"
            value={f.state.value}
            onChange={(e) => f.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(f) => (
          <Input
            type="password"
            placeholder="Password"
            value={f.state.value}
            onChange={(e) => f.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      <Button className="w-full">Login</Button>
    </form>
  );
}
