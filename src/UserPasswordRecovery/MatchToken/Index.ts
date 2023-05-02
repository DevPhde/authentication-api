import { MatchTokenController } from "./useCase/MatchTokenController";
import { MatchTokenUseCase } from "./useCase/MatchTokenUseCase";
import { RedisUserPasswordRecoveryRepository } from "../repository/implementations/RedisUserPasswordRecovery";


const redisUserPasswordRecoveryPassword = new RedisUserPasswordRecoveryRepository();
const matchTokenUseCase = new MatchTokenUseCase(
    redisUserPasswordRecoveryPassword
)

export const matchTokenController = new MatchTokenController(
    matchTokenUseCase
)