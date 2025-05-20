import { z } from "zod";

export const CursorSchema = z.object({
    limit: z.string().optional().default("5").transform(Number),
    direction: z.enum(["next", "prev", "first", "last"]).default("next"),
    nextCursor: z.string().optional(),
    previousCursor: z.string().optional(),
});

export type CursorDTO = z.infer<typeof CursorSchema>;
