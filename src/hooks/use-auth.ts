import { useMutation } from '@tanstack/react-query';

import { loginWithOtpApi, requestOtpApi } from '@/api/auth';
import { LoginRequest, RegisterRequest, UserProfile } from '@/api/types';
import { useAuthStore } from '@/store';

export function useRequestOtpMutation() {
  const setPhone = useAuthStore((state) => state.setPhone);

  return useMutation<string, Error, RegisterRequest>({
    mutationFn: (variables: RegisterRequest) => requestOtpApi(variables),
    onSuccess: (_data, variables) => {
      setPhone(variables.phone, variables.dial_code ?? '+91');
    },
  });
}

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<UserProfile, Error, LoginRequest>({
    mutationFn: (variables: LoginRequest) => loginWithOtpApi(variables),
    onSuccess: (data) => {
      setAuth(data.token, data);
    },
  });
}
