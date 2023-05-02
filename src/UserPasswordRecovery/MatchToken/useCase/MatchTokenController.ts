import { Response, Request } from "express";
import { MatchTokenUseCase } from "./MatchTokenUseCase";
export class MatchTokenController {
    constructor(
        private matchTokenUseCase: MatchTokenUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { authorization } = request.headers
        const { token } = request.body

        try {
            await this.matchTokenUseCase.execute({
                hash: authorization,
                token: token
            })
            return response.sendStatus(200)
        } catch (err) {
            return response.status(401).json({
                message: err.message || "Unexpected Error"
            })
        }

    }
}
