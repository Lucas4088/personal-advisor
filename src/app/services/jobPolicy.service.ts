import {http} from "./http";
import {JobPolicy} from "luksal/app/types/jobPolicy";

export const jobPolicyService = {

    get(name: string): Promise<JobPolicy> {
        return http<JobPolicy>(`/api/job-run-policy/${name}`, { method: "GET" });
    },

    update(payload: JobPolicy): Promise<JobPolicy> {
        return http<JobPolicy>(`/api/job-run-policy`, { method: "PUT", body: payload });
    },

};