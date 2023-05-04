import { RedisUserPasswordRecoveryRepository } from "../../repository/implementations/RedisUserPasswordRecovery";
import { MailTrapProvider } from "../../../provider/mailer/MailTrapProvider";
import { TokenGenerator } from "../../../provider/recoveryPasswordToken/TokenGeneratorProvider";
import { SequelizeUserPasswordRecoveryRepository } from "../../repository/implementations/SequelizeUserPasswordRecovery";
export class ResendTokenUseCase {
    constructor(
        private sequelizeUserPasswordRecoveryRepository: SequelizeUserPasswordRecoveryRepository,
        private redisDatabase: RedisUserPasswordRecoveryRepository,
        private mailTrapProvider: MailTrapProvider,
        private tokenGenerator: TokenGenerator
    ) { }

    async execute(hash: string): Promise<void> {
        const token = this.tokenGenerator.generate();
        const user = await this.sequelizeUserPasswordRecoveryRepository.getUserByJwt(hash);
        await this.redisDatabase.setToken(hash, token);

        await this.mailTrapProvider.sendMail({
            to: {
                email: user.dataValues.email,
                name: user.dataValues.name
            },
            from: {
                email: process.env.MAILTRAP_MAIL,
                name: "Admin"
            },
            subject: 'Recuperação de senha.',
            body: `<p>Insira o token para recuperar sua senha. <b>${token}</b></p>`

        })
    }
}