import { ITokenGeneratorProvider } from "./ITokenGeneratorProvider"

export class TokenGenerator implements ITokenGeneratorProvider {
    generate(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}