export interface IJwtProvider {
    jwtSign(email: string): Promise<string>
    jwtVerify(hash: string): Promise<void>
}