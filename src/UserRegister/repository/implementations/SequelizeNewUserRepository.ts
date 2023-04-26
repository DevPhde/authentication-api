import { User } from "../../../model/User";
import { ICreateUserRepository } from "../ICreateUserRepository";
import { UserEntity } from "../../entities/User";

export class SequelizeNewUserRepository implements ICreateUserRepository {
    async findByCpf(cpf: String): Promise<any> {
        return await User.findOne({ where: { cpf: cpf } })
    }
    async findByEmail(email: String): Promise<any> {
        return await User.findOne({where: {email: email}})
    }
    async save(user: UserEntity): Promise<void> {
        try {
            User.create({name: user.name, cpf: user.cpf, email: user.email, password: user.password});
        } catch(err) {
            throw new Error('An error occurred when trying to save the user in the database')
        }
    }
}