import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController { 
    constructor(
        private createUserUseCase: CreateUserUseCase
    ){}

    async handle(request: Request, response: Response): Promise<Response> {
        const {name, cpf, email, password} = request.body;

        try{
            await this.createUserUseCase.execute({
                name,
                cpf,
                email,
                password
            })
            return response.status(201).send();
        } catch (err) {
            return response.status(401).json({
                message: err.message || 'Unexpected Error.'
            })
        }
    } 
}