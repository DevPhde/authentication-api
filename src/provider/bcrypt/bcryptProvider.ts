import * as bcrypt from "bcrypt";
import { IBcryptProvider } from "./IBcryptProvider";

export class PasswordProtection implements IBcryptProvider {
    async securePassword(password: string): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hashSync(password, salt);
    }

    async checkPasswordAuthenticity(reqPassword: string,  hashedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(reqPassword, hashedPassword);
    }
}