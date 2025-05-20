import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { UserController } from "../../../../core/controllers/user.controller";
import { CursorSchema } from "../schemas/base.schemas";

async function meHandler(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const controller = new UserController()
        const user = await controller.getUser(req.user!.id!);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function historyHandler(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const parsedData = CursorSchema.parse(req.query);
        const controller = new UserController()
        const history = await controller.getUserSearchHistory(req.user!.id!, parsedData);
        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
}

async function favoritesHandler(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const parsedData = CursorSchema.parse(req.query);
        const controller = new UserController()
        const favorites = await controller.getUserFavorites(req.user!.id!, parsedData);
        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
}

export {
    meHandler,
    historyHandler,
    favoritesHandler
};