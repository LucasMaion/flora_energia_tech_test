import { NextFunction, Request, Response } from "express";
import { SignInSchema, SignUpSchema } from "../schemas/auth.schemas";
import { UserController } from "../../../../core/controllers/user.controller";
import { generateToken } from "../utilities/jwt.util";

async function signInHandler(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const parsed = SignInSchema.parse(req.body);
        const controller = new UserController()
        const user = await controller.signin(parsed.email, parsed.password);
        const token = generateToken({ id: user.id, name: user.name });
        res.status(200).json({ ...user, token });
    } catch (error) {
        next(error);
    }
}

async function signUpHandler(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const parsed = SignUpSchema.parse(req.body);
        const controller = new UserController()
        const user = await controller.signup(parsed.email, parsed.password, parsed.name);
        const token = generateToken({ id: user.id, name: user.name });
        res.status(200).json({ ...user, token });
    } catch (error) {
        next(error);
    }
}

export {
    signInHandler,
    signUpHandler
}