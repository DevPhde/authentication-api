import { Request, Response } from "express";
import { UserAuthotizationUseCase } from "./UserAuthorizationUseCase";

export class UserAuthorizationController {
    constructor(
        private userAuthorizationUseCase: UserAuthotizationUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        try {
            const hash = await this.userAuthorizationUseCase.execute({
                email,
                password
            })
            return response.status(200).json({
                jwt: hash
            })
        } catch (err) {
            return response.status(401).json({
                message: err.message || 'Unexpected Error'
            })
        }
    }
}