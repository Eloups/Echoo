"use client";

import { useCallback, type FC, type ReactNode } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/auth-client";
import { toast } from "sonner";

type Props = {
  children?: ReactNode
}

type FormData = {
  name: string,
  email: string,
  password: string,
}

export const RegisterForm: FC<Props> = function () {
  const form = useForm<FormData>();

  const registerMutation = useMutation({
    mutationFn: async (formData:FormData) => {
      const loading = toast.loading('Loading...');
      const {data, error} = await authClient.signUp.email(formData);
      toast.dismiss(loading);
      

      console.log("data =", data)
      if (error){
        toast.error(<>
          <span className="text-xs">{error.code}</span><br />
          {error.message}
        </>); 
      } else {
        toast.success(`User created (${data.user.email})`);
      }
    }
  })

  return <form className="space-y-4" onSubmit={form.handleSubmit((data) => registerMutation.mutate(data))}>
    {/* Name */}
    <div>
      <Label htmlFor="register-name">Name</Label>
      <Input 
        id="register-name" 
        placeholder='Name...'
        {...form.register('name')} 
      />
    </div>

    {/* Email */}
    <div>
      <Label htmlFor="register-email">E-mail address</Label>
      <Input 
        id="register-email" 
        placeholder='E-mail address...'
        {...form.register('email')} 
      />
    </div>

    {/* Password */}
    <div>
      <Label htmlFor="register-password">Password</Label>
      <Input 
        id="register-password" 
        placeholder='Password...'
        type="password"
        {...form.register('password')} 
      />
    </div>

    <Button className="w-full mt-2" size={"lg"} type="submit" disabled={registerMutation.isPending}>
      Register
    </Button>
  </form>;
};