import {
  changePassword,
  forgotPassword,
  freshToken,
  logout,
  logoutAll,
  logoutOtherDevices,
  me,
  resendVerification,
  resetPassword,
  signin,
  signup,
  verifyEmail,
  verifyPassword,
  verifyPasswordReset,
} from "@/api/auths";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

// Signup

export function useSignup() {
  return useMutation({
    mutationFn: signup,
  });
}

// Signin

export function useSignin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      });
    },
  });
}

// Current User

export function useAuthMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: me,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

// Fresh Access Token

export function useFreshToken() {
  return useMutation({
    mutationFn: freshToken,
  });
}

// Verify Email

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}

// Resend Verification

export function useResendVerification() {
  return useMutation({
    mutationFn: resendVerification,
  });
}

// Forgot Password

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

// Verify Password Reset OTP

export function useVerifyPasswordReset() {
  return useMutation({
    mutationFn: verifyPasswordReset,
  });
}

// Reset Password

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

// Verify Password

export function useVerifyPassword() {
  return useMutation({
    mutationFn: verifyPassword,
  });
}

// Change Password

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

// Logout

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: authKeys.me(),
      });
    },
  });
}

// Logout All Devices

export function useLogoutAll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAll,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: authKeys.me(),
      });
    },
  });
}

// Logout Other Devices

export function useLogoutOtherDevices() {
  return useMutation({
    mutationFn: logoutOtherDevices,
  });
}
