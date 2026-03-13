import { useQuery } from "@tanstack/react-query";
import { bookBasicInfoService } from "luksal/app/services/bookBasicInfo.service";

export function useBookBasicInfo(bookId: string | null) {
  return useQuery({
    queryKey: ["bookBasicInfo", bookId],
    queryFn: () => bookBasicInfoService.get(bookId!),
    enabled: !!bookId,
  });
}
