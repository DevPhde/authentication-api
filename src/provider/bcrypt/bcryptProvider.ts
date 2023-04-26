import * as bcrypt from "bcrypt";

export class PasswordProtection {
    async securePassword(password: String): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hashSync(password, salt);
    }

    async checkPasswordAuthenticity(reqPassword: String,  hashedPassword: String): Promise<Boolean> {
        return bcrypt.compareSync(reqPassword, hashedPassword);
    }
}