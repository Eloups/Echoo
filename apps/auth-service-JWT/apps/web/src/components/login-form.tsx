"use client";

import { type FC, type ReactNode } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/auth-client";
import { toast } from "sonner";
import { USER_TOKEN_KEY } from "@/lib/user";

type Props = {
  children?: ReactNode
}

type FormData = {
  email: string,
  password: string,
}

export const LoginForm: FC<Props> = function () {
  const form = useForm<FormData>();
  const session = authClient.useSession();
  const queryClient = useQueryClient();

  const signInMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const loading = toast.loading('Chargement...');
      const { data, error } = await authClient.signIn.email(formData);
      toast.dismiss(loading);

      if (error) {
        toast.error(<>
          <span className="text-xs">{error.code}</span><br />
          {error.message}
        </>);
      } else {
        toast.success(`Utilisateur connecté (${data.user.email})`);
      }
    }
  });

  const disconnectMutation = useMutation({
    mutationFn: async () => {
      const loading = toast.loading('Chargement...');
      const { data, error } = await authClient.signOut();
      toast.dismiss(loading);

      if (error) {
        toast.error(<>
          <span className="text-xs">{error.code}</span><br />
          {error.message}
        </>);
      } else {
        toast.success(`Utilisateur déconnecté`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: USER_TOKEN_KEY});
    }
  })

  return <form className="space-y-4" onSubmit={form.handleSubmit((data) => signInMutation.mutate(data))}>
    {/* Email */}
    <div>
      <Label htmlFor="signUp-email">E-mail</Label>
      <Input
        id="signUp-email"
        placeholder='E-mail address...'
        {...form.register('email')}
      />
    </div>

    {/* Password */}
    <div>
      <Label htmlFor="signUp-password">Password</Label>
      <Input
        id="signUp-password"
        placeholder='Password...'
        type="password"
        {...form.register('password')}
      />
    </div>

    <Button className="w-full mt-2" size={"lg"} type="submit" disabled={signInMutation.isPending || session.data != null}>
      Log In
    </Button>

    <Button className="w-full mt-2" size={"lg"} type="button" variant={"secondary"} onClick={() => disconnectMutation.mutate()} disabled={disconnectMutation.isPending || !session.data}>
      Sign Out
    </Button>
  </form>;
};