import { SequelizeUserPasswordRecoveryRepository } from "../repository/implementations/SequelizeUserPasswordRecovery";
import { RedisUserPasswordRecoveryRepository } from "../repository/implementations/RedisUserPasswordRecovery";
import { MailTrapProvider } from "../../provider/mailer/MailTrapProvider";
import { TokenGenerator } from "../../provider/recoveryPasswordToken/TokenGeneratorProvider";
import { ResendTokenUseCase } from "./useCases/ResendTokenUseCase";
import { ResendTokenController } from "./useCases/ResendTokenController";


const sequelize = new SequelizeUserPasswordRecoveryRepository();
const redis = new RedisUserPasswordRecoveryRepository();
const tokenGenerator = new TokenGenerator();
const mailTRapProvider = new MailTrapProvider();

const resendTokenUseCase = new ResendTokenUseCase(
    sequelize,
    redis,
    mailTRapProvider,
    tokenGenerator
)

export const resendTokenController = new ResendTokenController(
    resendTokenUseCase
)