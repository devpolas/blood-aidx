import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { Session } from "@/types/session";
import { User } from "@/types/user";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  ChangePasswordInput,
  ChangePasswordSchema,
  ForgotPasswordInput,
  ForgotPasswordSchema,
  LogoutInput,
  LogoutOtherDevicesInput,
  LogoutOtherDevicesSchema,
  LogoutSchema,
  ResendVerificationInput,
  ResendVerificationSchema,
  ResetPasswordInput,
  ResetPasswordSchema,
  SignInInput,
  SignInSchema,
  SignUpInput,
  SignUpSchema,
  VerifyEmailInput,
  VerifyEmailSchema,
  VerifyPasswordResetInput,
  VerifyPasswordResetSchema,
} from "@/validators/auth.validator";

// Signup

export async function signup(
  payload: SignUpInput,
): Promise<ApiResponse<{ user: User } | null>> {
  try {
    const parse = SignUpSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ user: User }>>("/auth/signup", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Signin

export async function signin(
  payload: SignInInput,
): Promise<ApiResponse<{ user: User; session: Session } | null>> {
  try {
    const parse = SignInSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ user: User; session: Session }>>(
      "/auth/signin",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Verify Email

export async function verifyEmail(
  payload: VerifyEmailInput,
): Promise<ApiResponse<{ user: User } | null>> {
  try {
    const parse = VerifyEmailSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ user: User }>>("/auth/verify-email", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Resend Verification

export async function resendVerification(
  payload: ResendVerificationInput,
): Promise<ApiResponse<null>> {
  try {
    const parse = ResendVerificationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<null>>("/auth/resend-verification", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Forgot Password

export async function forgotPassword(
  payload: ForgotPasswordInput,
): Promise<ApiResponse<null>> {
  try {
    const parse = ForgotPasswordSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<null>>("/auth/forgot-password", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Verify Password Reset OTP

export async function verifyPasswordReset(
  payload: VerifyPasswordResetInput,
): Promise<ApiResponse<{ resetToken: string } | null>> {
  try {
    const parse = VerifyPasswordResetSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ resetToken: string }>>(
      "/auth/verify-password-reset",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Reset Password

export async function resetPassword(
  payload: ResetPasswordInput,
): Promise<ApiResponse<null>> {
  try {
    const parse = ResetPasswordSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<null>>("/auth/reset-password", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Current User
// GET /auth/me

export async function me(): Promise<ApiResponse<{ user: User } | null>> {
  try {
    return await apiClient<ApiResponse<{ user: User }>>("/auth/me", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Fresh Access Token
// POST /auth/fresh-token

export async function freshToken(): Promise<ApiResponse<null>> {
  try {
    return await apiClient<ApiResponse<null>>("/auth/fresh-token", {
      method: "POST",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Verify Password
// POST /auth/verify-password

export async function verifyPassword(
  password: string,
): Promise<ApiResponse<null>> {
  try {
    if (!password.trim()) {
      return errorResponse("Password is required");
    }

    return await apiClient<ApiResponse<null>>("/auth/verify-password", {
      method: "POST",
      body: {
        password,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Change Password

export async function changePassword(
  payload: ChangePasswordInput,
): Promise<ApiResponse<null>> {
  try {
    const parse = ChangePasswordSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<null>>("/auth/change-password", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Logout

export async function logout(
  payload: LogoutInput = {},
): Promise<ApiResponse<null>> {
  try {
    const parse = LogoutSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<null>>("/auth/logout", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Logout All

export async function logoutAll(): Promise<ApiResponse<null>> {
  try {
    return await apiClient<ApiResponse<null>>("/auth/logout-all", {
      method: "POST",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Logout Other Devices

export async function logoutOtherDevices(
  payload: LogoutOtherDevicesInput,
): Promise<ApiResponse<null>> {
  try {
    const parse = LogoutOtherDevicesSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<null>>("/auth/logout-other-devices", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Google OAuth

export function googleSignIn(): void {
  window.location.assign(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social/google`,
  );
}
