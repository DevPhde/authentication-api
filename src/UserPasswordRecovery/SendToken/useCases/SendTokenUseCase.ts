import { RedisUserPasswordRecoveryRepository } from "../../repository/implementations/RedisUserPasswordRecovery";
import { SequelizeUserPasswordRecoveryRepository } from "../../repository/implementations/SequelizeUserPasswordRecovery";
import { TokenGenerator } from "../../../provider/recoveryPasswordToken/TokenGeneratorProvider";
import { MailTrapProvider } from "../../../provider/mailer/MailTrapProvider";
import { JsonWebTokenProvider } from "../../../provider/jwt/JsonWebTokenProvider";
import dotenv from "dotenv";
dotenv.config()
export class SendTokenUseCase {
    constructor(
        private redisDatabase: RedisUserPasswordRecoveryRepository,
        private sequelizeUserPasswordRecoveryRepository: SequelizeUserPasswordRecoveryRepository,
        private tokenGenerator: TokenGenerator,
        private mailTrapProvider: MailTrapProvider,
        private jsonWebTokenProvider: JsonWebTokenProvider
    ) { }

    async execute(email: string): Promise<string> {
        const user = await this.sequelizeUserPasswordRecoveryRepository.getUserByEmail(email)
        if (user === null) {
            throw new Error('Invalid Email')
        }
        const token = this.tokenGenerator.generate()
        await this.redisDatabase.setToken(email, token);

        
        await this.mailTrapProvider.sendMail({
            to: {
                email: email,
                name: user.dataValues.name
            },
            from: {
                email: process.env.MAILTRAP_MAIL,
                name: "Admin"
            },
            subject: 'Recuperação de senha.',
            body: `<p>Insira o token para recuperar sua senha. <b>${token}</b></p>`

        })
        
        const userHash = await this.jsonWebTokenProvider.jwtSign(email)
        await this.sequelizeUserPasswordRecoveryRepository.updateJwtToken(user.dataValues.id, userHash)
        return userHash
    }
}