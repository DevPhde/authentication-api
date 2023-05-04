export interface IUserPasswordRecovery {
    getUserByEmail(email: string): Promise<any>;
    getUserByJwt(hash: string): Promise<any>;
    updatePassword(id: number, password: string): Promise<void>;
    updateJwtToken(id: number, hash: string): Promise<void>;
}