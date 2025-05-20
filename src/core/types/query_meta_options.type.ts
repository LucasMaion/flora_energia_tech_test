export type QueryMetaOptions = {
    limit: number;
    previousCursor?: string
    nextCursor?: string;
    direction: "next" | "prev" | "first" | "last";
}