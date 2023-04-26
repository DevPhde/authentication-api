import { Router } from "express";
import { createUserController } from "../UserRegister/Index";


export const routes = Router();

routes
    .get('/', (request, response) => {response.status(200).send('Stabilized Connection')})
    .post('/new/user', (request, response) => {
        return createUserController.handle(request, response)
    })

    .get('/email', (request, response) => {
        
    })