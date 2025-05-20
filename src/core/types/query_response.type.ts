import { CursorMetadataResponse } from "./cursor_metadata.type";

export type QueryResponse<T> = {
    results: T[];
    metadata: CursorMetadataResponse
}