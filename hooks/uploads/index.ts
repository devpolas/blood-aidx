import { deleteFile, uploadFile } from "@/lib/actions/uploads";
import { useMutation } from "@tanstack/react-query";

// Upload File
export function useUploadFile() {
  return useMutation({
    mutationFn: uploadFile,
  });
}

// Delete File
export function useDeleteFile() {
  return useMutation({
    mutationFn: deleteFile,
  });
}
