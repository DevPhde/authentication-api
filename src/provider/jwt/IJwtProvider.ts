export interface IJwtProvider {
    jwtSign(email: string): Promise<string>
}