import { UserEntity } from "../entities/User";

export interface ICreateUserRepository {
    findByCpf(cpf: String): Promise<Boolean>;
    findByEmail(email: String): Promise<Boolean>;
    save(user: UserEntity): Promise<void>;
}