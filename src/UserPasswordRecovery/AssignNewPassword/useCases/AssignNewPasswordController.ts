import { Request, Response } from "express";
import { AssignNewPasswordUseCase } from "./AssignNewPasswordUseCase";
export class AssignNewPasswordController {
    constructor(
        private assignNewPasswordUseCase: AssignNewPasswordUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { authorization } = request.headers;
        const { password } = request.body;

        try {
            await this.assignNewPasswordUseCase.execute({
                hash: authorization,
                password: password
            })
            return response.sendStatus(200)
        } catch(err) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error'
            })
        }
    }
}