import { IUserAuthorizationDTO } from "./IUserAuthorizationDTO";
import { PasswordProtection } from "../../provider/bcrypt/bcryptProvider";
import { SequelizeUserAuthorizationRepository } from "../repository/implementations/SequelizeUserAuthorizationRepository";
import { JsonWebTokenProvider } from "../../provider/jwt/JsonWebTokenProvider";

export class UserAuthotizationUseCase {
    constructor(
        private sequelizeUserAuthorizationRepository: SequelizeUserAuthorizationRepository,
        private passwordProtection: PasswordProtection,
        private jwtProvider: JsonWebTokenProvider
    ) { }

    async execute(user: IUserAuthorizationDTO): Promise<string> {
        const registeredUser = await this.sequelizeUserAuthorizationRepository.findUserByEmail(user.email)

        if (registeredUser === null || (!await this.passwordProtection.checkPasswordAuthenticity(user.password, registeredUser.password))) {
            throw new Error('Email or Password Invalid')
        }
        const token = await this.jwtProvider.jwtSign(registeredUser.email)
        if (token) {
            await this.sequelizeUserAuthorizationRepository.updateJwtToken(registeredUser.id,token)
            return token
        }
    }
}