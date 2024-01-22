import request, { RespBody } from "./request";

export function GetDomains(params: any): Promise<RespBody> {
  return request.get("/api/domain", { params: params });
}

export function GetReleaseDeployment(id: string): Promise<RespBody> {
  return request.get("/api/release/" + id + "/deployment");
}

export function GetReleaseService(id: string): Promise<RespBody> {
  return request.get("/api/release/" + id + "/service");
}

export function GetReleasePod(id: string): Promise<RespBody> {
  return request.get("/api/release/" + id + "/pod");
}

// export function GetReleaseRecord(id: string): Promise<RespBody> {
//     return request.get("/api/release/" + id + "/record")
// }

export function GetReleaseLastRecord(id: string): Promise<RespBody> {
  return request.get("/api/release/" + id + "/record", {
    params: { page_size: 1, "ctime:ob": "desc" },
  });
}

export function BuildImage(data: any): Promise<RespBody> {
  return request.post("/api/image", data);
}

export function ApplyRelease(data: any): Promise<RespBody> {
  return request.post("/api/release/apply", data);
}

export function UpdateRelease(id: string, data: any): Promise<RespBody> {
  return request.put("/api/release/" + id, data);
}

export function UpdateReleaseImage(id: string, data: any): Promise<RespBody> {
  return request.put("/api/release/" + id + "/image", data);
}

export function UpdateReleaseReplicas(id: string, data: any): Promise<RespBody> {
  return request.put("/api/release/" + id + "/replica_count", data);
}

export function OfflineRelease(id: string): Promise<RespBody> {
  return request.put("/api/release/" + id + "/status/offline");
}
