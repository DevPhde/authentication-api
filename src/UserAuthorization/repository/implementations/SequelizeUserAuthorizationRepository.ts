import { User } from "../../../model/User";
import { IUserAuthorizationRepository } from "../IUserAuthorizarionRepository";

export class SequelizeUserAuthorizationRepository implements IUserAuthorizationRepository {

    async findUserByEmail(email: string): Promise<any> {
        try {
            return await User.findOne({ where: { email: email } })
        } catch {
            throw new Error('Internal Database Error')
        }
    }

    async updateJwtToken(id: number, hash: string): Promise<void> {
        try {
            User.update({ hash: hash }, { where: { id: id } })
        } catch (err) {
            throw new Error('Internal Error (code: 15L JWT Assign)')
        }
    }
}