export interface IUserPasswordRecovery {
    getUserByEmail(email: string): Promise<any>;
    updateJwtToken(id: number, hash: string): Promise<void>;
}