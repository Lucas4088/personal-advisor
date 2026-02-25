import {useQuery} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";

export function useJobPolicy(name: string | null | undefined) {
    const enabled = typeof name === "string" && name.length > 0;

    return useQuery({
        queryKey: ["jobPolicy", name],
        queryFn: () => dataPopulationService.get(name as string),
        enabled,
    });
}