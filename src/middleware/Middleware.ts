import { Response, Request, NextFunction } from "express";
import { JsonWebTokenProvider } from "../provider/jwt/JsonWebTokenProvider";

export async function middlewareVerification(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;


    if (!authorization) {
        return response.sendStatus(401)
    }

    const jsonWebToken = new JsonWebTokenProvider();
    try {
        await jsonWebToken.jwtVerify(authorization)
        return next()
    } catch (err) {
      return response.status(401).json({
            message: err.message || 'Unexpected Error'
        })
    }
}

