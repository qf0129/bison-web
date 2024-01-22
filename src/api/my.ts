import request, { RespBody, QueryBody } from "./request"


export function GetMyInfoRequest(): Promise<RespBody> {
    return request.get("/api/my/info")
}
export function CreateTeam(name: string): Promise<RespBody> {
    return request.post("/api/my/team", { name: name })
}
export function UpdateMyCurrentTeam(team_id: string): Promise<RespBody> {
    return request.put("/api/my/current_team", { team_id: team_id })
}
export function GetMyApps(params: QueryBody): Promise<RespBody> {
    return request.get("/api/my/app", { params: params })
}
export function GetMyEnvs(params: QueryBody): Promise<RespBody> {
    return request.get("/api/my/env", { params: params })
}
export function GetMyReleases(params: QueryBody): Promise<RespBody> {
    return request.get("/api/my/release", { params: params })
}
export function GetMyAppReleases(appId: string, params: QueryBody): Promise<RespBody> {
    return request.get("/api/my/app/" + appId + "/release", { params: params })
}
export function GetMyAppReleasesStatus(appId: string): Promise<RespBody> {
    return request.get("/api/my/app/" + appId + "/release/status")
}
export function GetMyAppImages(appId: string | string[], params: QueryBody): Promise<RespBody> {
    return request.get("/api/my/app/" + appId + "/image", { params: params })
}
export function GetMyAppConfigs(appId: string | string[], params: QueryBody): Promise<RespBody> {
    return request.get("/api/my/app/" + appId + "/config", { params: params })
}
export function CreateConfigs(appId: string | string[], configs: Array<any>): Promise<RespBody> {
    return request.post("/api/my/config", { app_id: appId, configs: configs })
}
export function UpdateConfigDesc(configId: string, desc: string): Promise<RespBody> {
    return request.put("/api/my/config/" + configId + "/desc", { desc: desc })
}
export function UpdateConfigValue(configId: string, value: string): Promise<RespBody> {
    return request.put("/api/my/config/" + configId + "/value", { value: value })
}
export function DeleteConfig(configId: string): Promise<RespBody> {
    return request.delete("/api/my/config/" + configId)
}
export function GetMyReleasePodLogs(releaseId: string | string[], params: any): Promise<RespBody> {
    return request.get("/api/my/release/" + releaseId + "/pod_logs", { params: params })
}
