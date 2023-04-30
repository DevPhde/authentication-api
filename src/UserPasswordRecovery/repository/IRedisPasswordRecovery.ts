export interface IRedisPasswordRecovery {
    setToken(email: string, token: number): Promise<void>;
    getToken(email: string): Promise<string>
}