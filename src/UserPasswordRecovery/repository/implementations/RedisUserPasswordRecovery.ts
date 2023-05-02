import { IRedisPasswordRecovery } from "../IRedisPasswordRecovery";
import { redisToken } from "../../../Redis/RedisConfig";

export class RedisUserPasswordRecoveryRepository implements IRedisPasswordRecovery {
    async setToken(hash: string, token: number): Promise<void> {
        try {
            redisToken.setex(hash, 900, token)
        } catch {
            throw new Error('Internal Error (code: 9L Redis Database)')
        }
    }

    async getToken(hash: string): Promise<number> {
        try {
            return Number(await redisToken.get(hash))
        } catch {
            throw new Error('Internal Error (code: 17L Redis Database)')
        }
    }
}
