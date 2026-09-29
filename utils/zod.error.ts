import { ZodError } from "zod";

export const handleZodError = (err: ZodError) => {
  const message = err.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");

  return message;
};
