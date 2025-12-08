"use client";

import { useState, type FC, type ReactNode } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRefreshToken, useUserJWT } from '../lib/user';
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  children?: ReactNode
}

const API_URL = process.env.API_URL!;
const EXPIRED_TOKEN = 'eyJhbGciOiJFZERTQSIsImtpZCI6ImNWZWhyQ1d4MzBPVjlFVG14WExPNnkyZ3JRYmw0amxOIn0.eyJpYXQiOjE3NjUxMjc5OTEsIm5hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiZW1haWxWZXJpZmllZCI6ZmFsc2UsImltYWdlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTEyLTA3VDE2OjI5OjAzLjUxMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTEyLTA3VDE2OjI5OjAzLjUxMFoiLCJpZCI6InR5UVAzSmpSSEZzd2hicVdsN21vdUZ5WHdwRWxoekUyIiwic3ViIjoidHlRUDNKalJIRnN3aGJxV2w3bW91RnlYd3BFbGh6RTIiLCJleHAiOjE3NjUxMjg4OTEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMyJ9.gBwp8jcLq3lfiqDx9VlUabLMjuuEhlQz8FUYTQZ1z94wRtYdUJ3mmkaBIIzt-dv3a92vZ5IXDlgoAbc9GN31DQ';
const INVALID_SIGNATURE_TOKEN = 'eyJhbGciOiJFZERTQSIsImtpZCI6InBVWW0zQWc3MUtMQ0V6RHBSRGNKYldkYUJybnFCblFTIn0.eyJpYXQiOjE3NjUxMzI4NTEsIm5hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiZW1haWxWZXJpZmllZCI6ZmFsc2UsImltYWdlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTEyLTA3VDE4OjQwOjQ2Ljc0N1oiLCJ1cGRhdGVkQXQiOiIyMDI1LTEyLTA3VDE4OjQwOjQ2Ljc0N1oiLCJpZCI6IlI3QllGS3VyS3FoTVJOSGQ0bE5waWpJTUlMVGp3cGkxIiwic3ViIjoiUjdCWUZLdXJLcWhNUk5IZDRsTnBpaklNSUxUandwaTEiLCJleHAiOjE3NjUxMzM3NTEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMyJ9.bDjJ_3C9iif7dDk3TqAyLa-qQS0ndxOcLpL2xhIv-Fq9OCAJsVbv8J_6T1FjrgIax1_Y4pEtZGlSjPwNYFD7AA'

export const APIRequestPlayground: FC<Props> = function () {
  const [response, setResponse] = useState(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [sentAt, setSentAt] = useState<Date | null>(null);

  const tokenQuery = useUserJWT();
  const refreshTokenMutation = useRefreshToken();

  const apiMutation = useMutation({
    mutationFn: async (token: string) => {
      const loading = toast.loading('Loading...', { duration: 5_000 });
      setSentAt(new Date());
      try {
        const response = await fetch(API_URL, {
          headers: {
            'token': token
            // "Accept": "*/*"
          },
        });
        const json = await response.json();
        setResponse(json);
        if (!response.ok) {
          toast.error("An error occured");
        } else {
          toast.success("Request successful !");
        }
        setIsSuccess(json.status === "SUCCESS");
        if (typeof json.decoded.exp === "number") {
          const expDate = new Date(json.decoded.exp * 1000)
          setExpirationDate(expDate);
        }
      } catch (e) {
        console.log("ERROR", e);
        toast.error("An error occured : ");
      } finally {
        toast.dismiss(loading);
      }
    }
  })

  return <div className="space-y-12">
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label>Real token</Label>
          <Button size="lg" className="w-full" onClick={() => {
            if (!tokenQuery.data)
              return;
            apiMutation.mutate(tokenQuery.data)
          }} disabled={!tokenQuery.data || apiMutation.isPending}>
            Send
          </Button>
        </div>

        <div>
          <Label>Refresh token</Label>
          <Button size="lg" className="w-full" onClick={() => refreshTokenMutation()} disabled={!tokenQuery.data || apiMutation.isPending}>
            Refresh user token
          </Button>
        </div>
      </div>

      <Label>Expired token</Label>
      <Button size="lg" className="w-full" disabled={apiMutation.isPending} onClick={() => apiMutation.mutate(EXPIRED_TOKEN)}>Send</Button>

      <Label>Invalid Signature token</Label>
      <Button size="lg" className="w-full" disabled={apiMutation.isPending} onClick={() => apiMutation.mutate(INVALID_SIGNATURE_TOKEN)}>Send</Button>
    </div>

    <div className="flex items-center justify-center gap-6">
      <div className="flex-1">
        <Label>Last request sent At</Label>
        <p className="font-mono">{sentAt && sentAt.toLocaleString()}</p>
      </div>
      {isSuccess !== null
        && <div className={`rounded-xl px-2 py-1 ${isSuccess ? 'bg-emerald-600' : 'bg-red-600'} text-white text-xs uppercase font-bold`}>{isSuccess ? "SUCCESS" : "ERROR"}</div>}
    </div>

    {expirationDate !== null && <>
      <Label>Token Expires At</Label>
      <p className="font-mono">{expirationDate.toLocaleString()}</p>
    </>}


    <Label>Token payload</Label>
    <pre className="overflow-x-scroll text-sm bg-slate-50 -mx-2 p-4 rounded-lg">
      {JSON.stringify(response, null, 2)}
    </pre>
  </div>;
};