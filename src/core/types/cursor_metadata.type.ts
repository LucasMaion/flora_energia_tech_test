export type CursorMetadataResponse = {
    totalDocs: number;
    previous?: string
    next?: string;
    hasNext: boolean;
    hasPrev: boolean;
}