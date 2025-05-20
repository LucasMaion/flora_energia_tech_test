export type ControllerQueryOptions = {
    limit: number;
    direction: "next" | "prev" | "first" | "last";
    nextCursor?: string;
    previousCursor?: string;
}