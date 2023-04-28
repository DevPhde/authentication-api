export interface IUserAuthorizationRepository {
    findUserByEmail(email: string): Promise<any>;
    updateJwtToken(id: number, hash: string): Promise<void>;
}
