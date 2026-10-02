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
} from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

// Signup
export function useSignup() {
  return useMutation({
    mutationFn: signup,
  });
}

// Signin
export function useSignin() {
  return useMutation({
    mutationFn: signin,
  });
}

// Current User
export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: me,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    retry: false,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
  return useMutation({
    mutationFn: logout,
  });
}

// Logout All Devices
export function useLogoutAll() {
  return useMutation({
    mutationFn: logoutAll,
  });
}

// Logout Other Devices
export function useLogoutOtherDevices() {
  return useMutation({
    mutationFn: logoutOtherDevices,
  });
}
