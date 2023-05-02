import { IMatchTokenDTO } from "./IMatchTokenDTO";
import { RedisUserPasswordRecoveryRepository } from "../../repository/implementations/RedisUserPasswordRecovery";
export class MatchTokenUseCase {
    constructor(
        private redisDatabase: RedisUserPasswordRecoveryRepository
    ){}

    async execute(token: IMatchTokenDTO):Promise<boolean> {
        if(await this.redisDatabase.getToken(token.hash) !== token.token) {
            throw new Error('Invalid Token')
        }
        return true
    }
}