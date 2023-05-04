import { Router } from "express";
import { createUserController } from "../UserRegister/Index";
import { authorizationUserController } from "../UserAuthorization/Index"
import { sendTokenController } from "../UserPasswordRecovery/SendToken/Index";
import { matchTokenController } from "../UserPasswordRecovery/MatchToken/Index";
import { middlewareVerification } from "../middleware/Middleware";
import { assignNewPasswordController } from "../UserPasswordRecovery/AssignNewPassword/Index";
import { resendTokenController } from "../UserPasswordRecovery/ResendToken/Index";

export const routes = Router();

routes
    .get('/', (request, response) => { response.status(200).send('Stabilized Connection') })

    .post('/new/user', (request, response) => {
        return createUserController.handle(request, response)
    })

    .post('/user/login', (request, response) => {
        return authorizationUserController.handle(request, response)
    })

    .post('/user/recoverypassword', (request, response) => {
        return sendTokenController.handle(request, response)
    })

    .post('/user/matchtoken', middlewareVerification, (request, response) => {
        return matchTokenController.handle(request, response)
    })

    .put('/user/recoverypassword/newpassword', middlewareVerification, (request, response) => {
        return assignNewPasswordController.handle(request, response)
    })

    .get('/user/recoverypassword/resendtoken', middlewareVerification, (request, response) => {
        return resendTokenController.handle(request, response)
    })