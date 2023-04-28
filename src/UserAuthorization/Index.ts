import { UserAuthorizationController } from "./useCases/UserAuthorizationController";
import { UserAuthotizationUseCase } from "./useCases/UserAuthorizationUseCase";
import { SequelizeUserAuthorizationRepository } from "./repository/implementations/SequelizeUserAuthorizationRepository";
import { PasswordProtection } from "../provider/bcrypt/bcryptProvider";
import { JsonWebTokenProvider } from "../provider/jwt/JsonWebTokenProvider";


const passwordProtection = new PasswordProtection()
const jsonWebTokenProvider = new JsonWebTokenProvider()
const sequelizeUserAuthorizationRepository = new SequelizeUserAuthorizationRepository()
const userAuthorizationUseCase = new UserAuthotizationUseCase(
    sequelizeUserAuthorizationRepository,
    passwordProtection,
    jsonWebTokenProvider
)
export const authorizationUserController = new UserAuthorizationController(
    userAuthorizationUseCase
)