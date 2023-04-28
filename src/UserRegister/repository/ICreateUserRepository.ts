import { UserEntity } from "../entities/User";

export interface ICreateUserRepository {
    findByCpf(cpf: string): Promise<boolean>;
    findByEmail(email: string): Promise<boolean>;
    save(user: UserEntity): Promise<void>;
}