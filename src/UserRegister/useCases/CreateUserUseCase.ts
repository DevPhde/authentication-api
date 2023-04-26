import { ICreateUserRepository } from "../repository/ICreateUserRepository"
import { IUserDTO } from "./ICreateUserDTO"
import { UserEntity } from "../entities/User"
import { PasswordProtection } from "../../provider/bcrypt/bcryptProvider";

export class CreateUserUseCase {
    constructor(
        private userRepository: ICreateUserRepository,
        private passwordProtection: PasswordProtection 
    ){}

    async execute(data: IUserDTO){
        const cpfAlreadyExists = await this.userRepository.findByCpf(data.cpf) !== null ? true : false;
        const emailAlreadyExists = await this.userRepository.findByEmail(data.email) !== null ? true : false;

        if(cpfAlreadyExists || emailAlreadyExists) {
            throw new Error(`${cpfAlreadyExists ? "CPF" : ""} ${cpfAlreadyExists && emailAlreadyExists ? " e " : ""} ${emailAlreadyExists ? "Email" : ""} Já cadastrado.`)
        }
        try{
            data.password = await this.passwordProtection.securePassword(data.password)
        } catch(err) {
            throw new Error('Internal Error (Error Code: 22L Create User)')
        }
        const user = new UserEntity(data)
        await this.userRepository.save(user)
    }
}