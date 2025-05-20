import { NextFunction, Request, Response } from "express";
import { BadQueryError, BadRequestError, UserNotFoundError, WordNotFoundError } from "../../../../core/exceptions";
import { ZodError } from "zod";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof BadQueryError) {
        res.status(400).json({ message: error.message })
        return;
    }
    if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message })
        return;
    }
    if (error instanceof UserNotFoundError) {
        res.status(404).json({ message: error.message })
        return;
    }
    if (error instanceof WordNotFoundError) {
        res.status(404).json({ message: error.message })
        return;
    }
    if (error instanceof ZodError) {
        res.status(400).send({message: error.issues.map(issue => issue.message).join(", ")})
        return;
    }
    res.status(500).json({ message: "Erro interno no servidor" })
};
