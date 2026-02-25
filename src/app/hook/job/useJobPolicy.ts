import {useQuery} from "@tanstack/react-query";
import {jobPolicyService} from "luksal/app/services/jobPolicy.service";

export function useJobPolicy(name: string | null | undefined) {
    const enabled = typeof name === "string" && name.length > 0;

    console.log(`Fetching job policy for name: ${name}, enabled: ${enabled}`);
    return useQuery({
        queryKey: ["jobPolicy", name],
        queryFn: () => jobPolicyService.get(name as string),
        enabled,
    });
}