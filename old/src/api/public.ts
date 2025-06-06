import request, { RespBody } from "./request"


export function UserSignInRequst(username: string, password: string): Promise<RespBody> {
    return request.post("/api/auth/signin", { username: username, password: password })
}

export function UserSignUpRequst(username: string, password: string): Promise<RespBody> {
    return request.post("/api/auth/signup", { username: username, password: password })
}

export function UserSignOutRequst(): Promise<RespBody> {
    return request.post("/api/auth/signout")
}