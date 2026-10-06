import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { User } from "@/types/user";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  AdminUpdateUserInput,
  AdminUpdateUserRoleInput,
  AdminUpdateUserRoleSchema,
  AdminUpdateUserSchema,
  BanUserInput,
  BanUserSchema,
  UpdateUserInput,
  UpdateUserSchema,
  UserIdSchema,
} from "@/validators/user.validator";

// Current User
// GET /users
export async function getMe(): Promise<ApiResponse<{ user: User }>> {
  try {
    return await apiClient<ApiResponse<{ user: User }>>("/users", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Current User
// PATCH /users
export async function updateMe(
  payload: UpdateUserInput,
): Promise<ApiResponse<{ user: User }>> {
  try {
    const payloadParse = UpdateUserSchema.safeParse(payload);

    if (!payloadParse.success) {
      return errorResponse(
        handleZodError(payloadParse.error) || "Invalid input",
      );
    }

    return await apiClient<ApiResponse<{ user: User }>>("/users", {
      method: "PATCH",
      body: payloadParse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Current User
// DELETE /users
export async function deleteMe(): Promise<ApiResponse<null>> {
  try {
    return await apiClient<ApiResponse<null>>("/users", {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Admin: Get All Users
// GET /admin/users
export async function getUsers(): Promise<ApiResponse<{ users: User[] }>> {
  try {
    return await apiClient<ApiResponse<{ users: User[] }>>("/admin/users", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Admin: Get User
// GET /admin/users/:userId
export async function getUser(
  id: string,
): Promise<ApiResponse<{ user: User }>> {
  try {
    const parse = UserIdSchema.safeParse({ id });

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid user ID");
    }

    return await apiClient<ApiResponse<{ user: User }>>(
      `/admin/users/${parse.data.id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Admin: Update User
// PATCH /admin/users/:userId
export async function adminUpdateUser(
  id: string,
  payload: AdminUpdateUserInput,
): Promise<ApiResponse<{ user: User }>> {
  try {
    const idParse = UserIdSchema.safeParse({ id });

    if (!idParse.success) {
      return errorResponse(handleZodError(idParse.error) || "Invalid user ID");
    }

    const payloadParse = AdminUpdateUserSchema.safeParse(payload);

    if (!payloadParse.success) {
      return errorResponse(
        handleZodError(payloadParse.error) || "Invalid input",
      );
    }

    return await apiClient<ApiResponse<{ user: User }>>(
      `/admin/users/${idParse.data.id}`,
      {
        method: "PATCH",
        body: payloadParse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Admin: Change User Role
// PATCH /admin/users/:userId/role
export async function adminUpdateUserRole(
  id: string,
  payload: AdminUpdateUserRoleInput,
): Promise<ApiResponse<{ user: User }>> {
  try {
    const idParse = UserIdSchema.safeParse({ id });

    if (!idParse.success) {
      return errorResponse(handleZodError(idParse.error) || "Invalid user ID");
    }

    const payloadParse = AdminUpdateUserRoleSchema.safeParse(payload);

    if (!payloadParse.success) {
      return errorResponse(
        handleZodError(payloadParse.error) || "Invalid role input",
      );
    }

    return await apiClient<ApiResponse<{ user: User }>>(
      `/admin/users/${idParse.data.id}/role`,
      {
        method: "PATCH",
        body: payloadParse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Admin: Ban User
// PATCH /admin/users/:userId/ban
export async function banUser(
  id: string,
  payload: BanUserInput,
): Promise<ApiResponse<{ user: User }>> {
  try {
    const idParse = UserIdSchema.safeParse({ id });

    if (!idParse.success) {
      return errorResponse(handleZodError(idParse.error) || "Invalid user ID");
    }

    const payloadParse = BanUserSchema.safeParse(payload);

    if (!payloadParse.success) {
      return errorResponse(
        handleZodError(payloadParse.error) || "Invalid ban input",
      );
    }

    return await apiClient<ApiResponse<{ user: User }>>(
      `/admin/users/${idParse.data.id}/ban`,
      {
        method: "PATCH",
        body: payloadParse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Admin: Unban User
// PATCH /admin/users/:userId/unban
export async function unbanUser(
  id: string,
): Promise<ApiResponse<{ user: User }>> {
  try {
    const parse = UserIdSchema.safeParse({ id });

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid user ID");
    }

    return await apiClient<ApiResponse<{ user: User }>>(
      `/admin/users/${parse.data.id}/unban`,
      {
        method: "PATCH",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Admin: Delete User
// DELETE /admin/users/:userId
export async function deleteUser(id: string): Promise<ApiResponse<null>> {
  try {
    const parse = UserIdSchema.safeParse({ id });

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid user ID");
    }

    return await apiClient<ApiResponse<null>>(`/admin/users/${parse.data.id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
