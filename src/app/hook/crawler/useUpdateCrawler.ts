import {useMutation, useQueryClient} from "@tanstack/react-query";
import {crawlerService} from "luksal/app/services/crawler.service";
import {CrawlerSetting} from "luksal/app/types/crawler";

export function useUpdateCrawler() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<CrawlerSetting>;
    }) => crawlerService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["crawlers"] });
      queryClient.invalidateQueries({ queryKey: ["crawler", variables.id] });
    },
    onError: (error) => {
      console.error("Update crawler mutation failed:", error);
    },
  });
}