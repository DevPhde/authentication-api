import { Request, Response } from "express";
import { ResendTokenUseCase } from "./ResendTokenUseCase";

export class ResendTokenController {
    constructor(
        private resendTokenUseCase: ResendTokenUseCase
    ){}

    async handle(request: Request, response: Response): Promise<Response> {
        const {authorization} = request.headers;

        try {
            this.resendTokenUseCase.execute(authorization)

            return response.sendStatus(200)
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error'
            })
        }
    }
}