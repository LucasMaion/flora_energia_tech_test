import { z } from "zod";
import { CursorSchema } from "./base.schemas";

export const SearchWordsHandlerSchema = z.object({
    search: z.string().optional()
}).merge(CursorSchema);

export const WordDetailsHandlerSchema = z.object({
    word: z.string(),
});

export const FavoriteHandlerSchema = z.object({
    word: z.string(),
});

export const UnfavoriteHandlerSchema = z.object({
    word: z.string(),
});

export type SearchWordsHandlerDTO = z.infer<typeof SearchWordsHandlerSchema>;
export type WordDetailsHandlerDTO = z.infer<typeof WordDetailsHandlerSchema>;
export type FavoriteHandlerDTO = z.infer<typeof FavoriteHandlerSchema>;
export type UnfavoriteHandlerDTO = z.infer<typeof UnfavoriteHandlerSchema>;