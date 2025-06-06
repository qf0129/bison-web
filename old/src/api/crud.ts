import request, { RespBody } from "./request";

export function CrudGet(modelName: string, params: any): Promise<RespBody> {
  return request.get("/api/console/" + modelName, { params: params });
}
export function CrudPost(modelName: string, body: any): Promise<RespBody> {
  return request.post("/api/console/" + modelName, body);
}
export function CrudPut(modelName: string, modelId: string, body: any): Promise<RespBody> {
  return request.put("/api/console/" + modelName + "/" + modelId, body);
}
export function CrudDelete(modelName: string, modelId: string): Promise<RespBody> {
  return request.delete("/api/console/" + modelName + "/" + modelId);
}
