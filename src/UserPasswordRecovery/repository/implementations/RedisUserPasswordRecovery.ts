import { IRedisPasswordRecovery } from "../IRedisPasswordRecovery";
import { redisToken } from "../../../Redis/RedisConfig";

export class RedisUserPasswordRecoveryRepository implements IRedisPasswordRecovery {
    async setToken(email: string, token: number): Promise<void> {
        try {
            redisToken.setex(email, 900, token)
        } catch {
            throw new Error('Internal Error (code: 9L Redis Database)')
        }
    }

    async getToken(email: string): Promise<string> {
        try {
            return await redisToken.get(email)
        } catch (e){
            console.log(e)
        }
    }
}
