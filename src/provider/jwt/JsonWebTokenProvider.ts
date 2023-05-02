import { IJwtProvider } from "./IJwtProvider";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class JsonWebTokenProvider implements IJwtProvider {
    async jwtSign(email: string): Promise<string> {
        const token = await jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '1d'})
        return token
    }

    async jwtVerify(hash: string): Promise<void> {
        try{
           await jwt.verify(hash, process.env.JWT_SECRET)
        } catch {
            throw new Error('Invalid JWT')
        }
    }
}