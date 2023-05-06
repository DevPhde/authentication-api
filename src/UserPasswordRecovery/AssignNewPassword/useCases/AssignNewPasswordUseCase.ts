import { IAssignNewPasswordDTO } from "./IAssignNewPasswordDTO";
import { RedisUserPasswordRecoveryRepository } from "../../repository/implementations/RedisUserPasswordRecovery";
import { SequelizeUserPasswordRecoveryRepository } from "../../repository/implementations/SequelizeUserPasswordRecovery";
import { PasswordProtection } from "../../../provider/bcrypt/BcryptProvider";

export class AssignNewPasswordUseCase {
    constructor(
        private redisDatabase: RedisUserPasswordRecoveryRepository,
        private sequelizeUserPasswordRepository: SequelizeUserPasswordRecoveryRepository,
        private passwordProtection: PasswordProtection
    ) {}

    async execute(newPassword: IAssignNewPasswordDTO): Promise<void> {
        const user = await this.sequelizeUserPasswordRepository.getUserByJwt(newPassword.hash)
        if(await this.passwordProtection.checkPasswordAuthenticity(newPassword.password, user.dataValues.password)) {
            throw new Error('new password cannot be the same as the old one')
        }
        await this.sequelizeUserPasswordRepository.updatePassword(user.dataValues.id, await this.passwordProtection.securePassword(newPassword.password))
    }
}