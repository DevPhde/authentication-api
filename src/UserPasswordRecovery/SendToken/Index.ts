import { SendTokenController } from "./useCases/SendTokenController";
import { SendTokenUseCase } from "./useCases/SendTokenUseCase";
import { RedisUserPasswordRecoveryRepository } from "../repository/implementations/RedisUserPasswordRecovery";
import { SequelizeUserPasswordRecoveryRepository } from "../repository/implementations/SequelizeUserPasswordRecovery";
import { MailTrapProvider } from "../../provider/mailer/MailTrapProvider";
import { TokenGenerator } from "../../provider/recoveryPasswordToken/TokenGeneratorProvider";
import { JsonWebTokenProvider } from "../../provider/jwt/JsonWebTokenProvider";
const redisUserPasswordRecoveryRepository = new RedisUserPasswordRecoveryRepository();
const sequelizeUserRecoveryPasswordRepository = new SequelizeUserPasswordRecoveryRepository();
const tokenGenerator = new TokenGenerator();
const mailTrapProvider = new MailTrapProvider();
const jsonWebTokenProvider = new JsonWebTokenProvider()

const sendTokenUseCase = new SendTokenUseCase(
    redisUserPasswordRecoveryRepository,
    sequelizeUserRecoveryPasswordRepository,
    tokenGenerator,
    mailTrapProvider,
    jsonWebTokenProvider
)


export const sendTokenController = new SendTokenController(
    sendTokenUseCase
);