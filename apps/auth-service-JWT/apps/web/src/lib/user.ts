"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from '../auth-client';
import { useCallback } from "react";

export const USER_TOKEN_KEY = ['user-token'];

export function useUserJWT(){
  return useQuery({
    queryKey: USER_TOKEN_KEY,
    queryFn: async () =>  {
      const {data, error} = await authClient.token();
      if (error) 
        throw error;

      return data.token;
    }
  });
}

export function useRefreshToken() {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries({queryKey: USER_TOKEN_KEY});
    // queryClient.refetchQueries({queryKey: USER_TOKEN_KEY});
  }, []);
}