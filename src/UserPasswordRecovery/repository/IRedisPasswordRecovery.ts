export interface IRedisPasswordRecovery {
    setToken(hash: string, token: number): Promise<void>;
    getToken(hash: string): Promise<number>
}