import { IUserPasswordRecovery } from "../IUserPasswordRecovery";
import { User } from "../../../model/User";
export class SequelizeUserPasswordRecoveryRepository implements IUserPasswordRecovery {
    async getUserByEmail(email: string): Promise<any> {
        return await User.findOne({where: {email: email}});
    }

    async getUserByJwt(hash: string): Promise<any> {
        return await User.findOne({where: {hash: hash}});
    }

    async updatePassword(id: number, password: string): Promise<void> {
        try {
            User.update({ password: password }, { where: { id: id } })
        } catch (err) {
            throw new Error('Internal Error (code: 16L Password Assign)')
        }
    }

    async updateJwtToken(id: number, hash: string): Promise<void> {
        try {
            User.update({ hash: hash }, { where: { id: id } })
        } catch (err) {
            throw new Error('Internal Error (code: 24L JWT Assign)')
        }
    }
}