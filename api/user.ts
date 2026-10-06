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

// Get Users
// GET /users

export async function getUsers(): Promise<
  ApiResponse<{ users: User[] } | null>
> {
  try {
    return await apiClient<ApiResponse<{ users: User[] }>>("/users", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get User
// GET /users/:id

export async function getUser(
  id: string,
): Promise<ApiResponse<{ user: User } | null>> {
  try {
    const parse = UserIdSchema.safeParse({ id });

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid user ID");
    }

    return await apiClient<ApiResponse<{ user: User }>>(
      `/users/${parse.data.id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update User
// PATCH /users/:id

export async function updateUser(
  id: string,
  payload: UpdateUserInput,
): Promise<ApiResponse<{ user: User } | null>> {
  try {
    const idParse = UserIdSchema.safeParse({ id });

    if (!idParse.success) {
      return errorResponse(handleZodError(idParse.error) || "Invalid user ID");
    }

    const payloadParse = UpdateUserSchema.safeParse(payload);

    if (!payloadParse.success) {
      return errorResponse(
        handleZodError(payloadParse.error) || "Invalid input",
      );
    }

    return await apiClient<ApiResponse<{ user: User }>>(
      `/users/${idParse.data.id}`,
      {
        method: "PATCH",
        body: payloadParse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete User
// DELETE /users/:id

export async function deleteUser(id: string): Promise<ApiResponse<null>> {
  try {
    const parse = UserIdSchema.safeParse({ id });

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid user ID");
    }

    return await apiClient<ApiResponse<null>>(`/users/${parse.data.id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Admin Update User
// PATCH /admin/users/:id

export async function adminUpdateUser(
  id: string,
  payload: AdminUpdateUserInput,
): Promise<ApiResponse<{ user: User } | null>> {
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

// Admin Update User Role
// PATCH /admin/users/:id/role

export async function adminUpdateUserRole(
  id: string,
  payload: AdminUpdateUserRoleInput,
): Promise<ApiResponse<{ user: User } | null>> {
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

// Ban User
// POST /admin/users/:id/ban

export async function banUser(
  id: string,
  payload: BanUserInput,
): Promise<ApiResponse<{ user: User } | null>> {
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
        method: "POST",
        body: payloadParse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Unban User
// DELETE /admin/users/:id/ban

export async function unbanUser(
  id: string,
): Promise<ApiResponse<{ user: User } | null>> {
  try {
    const parse = UserIdSchema.safeParse({ id });

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid user ID");
    }

    return await apiClient<ApiResponse<{ user: User }>>(
      `/admin/users/${parse.data.id}/ban`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
