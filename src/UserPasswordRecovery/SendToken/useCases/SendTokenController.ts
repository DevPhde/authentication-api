import { Response, Request } from "express";
import { SendTokenUseCase } from "./SendTokenUseCase";
export class SendTokenController {
    constructor(
        private sentTokenUseCase: SendTokenUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        try {
            const token = await this.sentTokenUseCase.execute(email);

            return response.status(200).json({
                jwt: token
            });
        } catch (err) {
            return response.status(401).json({
                message: err.message || 'Unexpected Error.'
            })
        }
    }
}