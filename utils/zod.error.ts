import { ZodError } from "zod";

export const handleZodError = (error: ZodError) => {
  const message = error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");

  return message;
};
