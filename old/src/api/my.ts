import request, { RespBody } from "./request";

export function GetMyInfoRequest(): Promise<RespBody> {
  return request.get("/api/my/info");
}
export function CreateTeam(name: string): Promise<RespBody> {
  return request.post("/api/my/team", { name: name });
}
export function UpdateMyCurrentTeam(team_id: string): Promise<RespBody> {
  return request.put("/api/my/current_team", { team_id: team_id });
}
export function GetMyApps(params: any): Promise<RespBody> {
  return request.get("/api/my/app", { params: params });
}
export function GetMyEnvs(params: any): Promise<RespBody> {
  return request.get("/api/my/env", { params: params });
}
export function GetMyReleases(params: any): Promise<RespBody> {
  return request.get("/api/my/release", { params: params });
}
export function GetMyAppReleases(appId: string, params: any): Promise<RespBody> {
  return request.get("/api/my/app/" + appId + "/release", { params: params });
}
export function GetMyAppReleasesStatus(appId: string): Promise<RespBody> {
  return request.get("/api/my/app/" + appId + "/release/status");
}
export function GetMyAppImages(appId: string | string[], params: any): Promise<RespBody> {
  return request.get("/api/my/app/" + appId + "/image", { params: params });
}

export function CreateAppImage(appId: string, data: any): Promise<RespBody> {
  return request.post("/api/my/app/" + appId + "/image", data);
}

export function GetMyAppConfigs(appId: string | string[], params: any): Promise<RespBody> {
  return request.get("/api/my/app/" + appId + "/config", { params: params });
}
export function CreateConfigs(appId: string | string[], configs: Array<any>): Promise<RespBody> {
  return request.post("/api/my/app/" + appId + "/config", { configs: configs });
}
export function UpdateConfigDesc(configId: string, desc: string): Promise<RespBody> {
  return request.put("/api/my/config/" + configId + "/desc", { desc: desc });
}
export function UpdateConfigValue(configId: string, value: string): Promise<RespBody> {
  return request.put("/api/my/config/" + configId + "/value", { value: value });
}
export function DeleteConfig(configId: string): Promise<RespBody> {
  return request.delete("/api/my/config/" + configId);
}
export function GetMyReleasePodLogs(releaseId: string | string[], params: any): Promise<RespBody> {
  return request.get("/api/my/release/" + releaseId + "/pod_logs", { params: params });
}

export function GetEnvDomains(envId: string, params: any): Promise<RespBody> {
  return request.get("/api/my/env/" + envId + "/domain", { params: params });
}

export function GetReleaseDeployment(id: string): Promise<RespBody> {
  return request.get("/api/my/release/" + id + "/deployment");
}

export function GetReleaseService(id: string): Promise<RespBody> {
  return request.get("/api/my/release/" + id + "/service");
}

export function GetReleasePod(id: string): Promise<RespBody> {
  return request.get("/api/my/release/" + id + "/pod");
}

// export function GetReleaseRecord(id: string): Promise<RespBody> {
//     return request.get("/api/my/release/" + id + "/record")
// }

export function GetReleaseLastRecord(id: string): Promise<RespBody> {
  return request.get("/api/my/release/" + id + "/record", {
    params: { page_size: 1, "ctime:ob": "desc" },
  });
}

export function ApplyRelease(data: any): Promise<RespBody> {
  return request.post("/api/my/release/apply", data);
}

export function UpdateRelease(id: string, data: any): Promise<RespBody> {
  return request.put("/api/my/release/" + id, data);
}

export function UpdateReleaseImage(id: string, data: any): Promise<RespBody> {
  return request.put("/api/my/release/" + id + "/image", data);
}

export function UpdateReleaseReplicas(id: string, data: any): Promise<RespBody> {
  return request.put("/api/my/release/" + id + "/replica_count", data);
}

export function OfflineRelease(id: string): Promise<RespBody> {
  return request.put("/api/my/release/" + id + "/status/offline");
}
