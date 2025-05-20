import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { WordController } from "../../../../core/controllers/word.controller";
import { FavoriteHandlerSchema, SearchWordsHandlerSchema, UnfavoriteHandlerSchema, WordDetailsHandlerSchema } from "../schemas/entries.schemas";

async function searchWordsHandler(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const parsedData = SearchWordsHandlerSchema.parse(req.query);
        const controller = new WordController()
        const searchOptions = {
            limit: parsedData.limit,
            direction: parsedData.direction,
            nextCursor: parsedData.nextCursor,
            previousCursor: parsedData.previousCursor
        }
        const words = await controller.listWords(parsedData.search, searchOptions)
        res.status(200).json({ results: words })
    } catch (error) {
        next(error);
    }
}

async function wordDetailsHandler(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const parsedData = WordDetailsHandlerSchema.parse(req.params);
        const controller = new WordController()
        const word = await controller.getWordDetail(parsedData.word, req.user!.id!);
        res.status(200).json(word);
    } catch (error) {
        next(error);
    }
}

async function favoriteHandler(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const parsedData = FavoriteHandlerSchema.parse(req.params);
        const controller = new WordController()
        await controller.favoriteWord(parsedData.word, req.user!.id!);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

async function unfavoriteHandler(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const parsedData = UnfavoriteHandlerSchema.parse(req.params);
        const controller = new WordController()
        await controller.unfavoriteWord(parsedData.word, req.user!.id!);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

export {
    searchWordsHandler,
    wordDetailsHandler,
    favoriteHandler,
    unfavoriteHandler
};