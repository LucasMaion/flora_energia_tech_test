import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export type AddCursorQueryResponse<T extends ObjectLiteral> = {
    query: SelectQueryBuilder<T>
    previous: string
    next: string;
    hasNext: boolean;
    hasPrev: boolean;
}