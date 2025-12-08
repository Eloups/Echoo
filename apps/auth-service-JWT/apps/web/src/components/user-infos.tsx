"use client";

import { authClient } from "@/auth-client";
import type { FC, ReactNode } from "react";
import { Label } from "./ui/label";
import { useQuery } from "@tanstack/react-query";
import { useUserJWT } from "@/lib/user";

type Props = {
  children?: ReactNode
}

export const UserInfos: FC<Props> = function () {
  const session = authClient.useSession();
  const tokenQuery = useUserJWT()
  const jwkQuery = useQuery({
    queryKey: ['jwk'],
    queryFn: async () =>  {
      return authClient.jwks();
    }
  });

  if (!session.data && !session.isPending)
    return <div className="min-h-40 flex justify-center items-center">
      You must first login
    </div>

  return <div className="space-y-12">
    <Label>Session Data</Label>
    <pre className="overflow-x-scroll text-sm bg-slate-50 -mx-2 p-4 rounded-lg">
      {JSON.stringify(session.data, null, 2)}
    </pre>

    <Label>JWT Token</Label>
    <div className="font-mono text-sm break-all text-wrap select-all bg-slate-50 -mx-2 p-4 rounded-lg">
      {tokenQuery.data}
    </div>

    <Label>JWK</Label>
    <pre className="font-mono break-all text-sm text-wrap select-all bg-slate-50 -mx-2 p-4 rounded-lg">
      {JSON.stringify(jwkQuery.data?.data, null, 2)}
    </pre>
  </div>;
};