import { useQuery } from "@tanstack/react-query";
import { bookBasicInfoService } from "luksal/app/services/bookBasicInfo.service";
import { BookBasicInfoSearchCriteria } from "luksal/app/types/bookBasicInfo";

export function useBookBasicInfos(criteria: BookBasicInfoSearchCriteria, page: number = 0, size: number = 10) {
  return useQuery({
    queryKey: ["bookBasicInfos", criteria, page, size],
    queryFn: () => bookBasicInfoService.search(criteria, page, size),
  });
}
