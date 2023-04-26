import { SequelizeNewUserRepository } from "./repository/implementations/SequelizeNewUserRepository";
import { CreateUserController } from "./useCases/CreateUserController";
import { CreateUserUseCase } from "./useCases/CreateUserUseCase";
import { PasswordProtection } from "../provider/bcrypt/bcryptProvider";

const sequelizeNewUserRepository = new SequelizeNewUserRepository()
const passwordProtection = new PasswordProtection()
export const createUserUseCase = new CreateUserUseCase(
    sequelizeNewUserRepository,
    passwordProtection
)

export const createUserController = new CreateUserController(
    createUserUseCase
)