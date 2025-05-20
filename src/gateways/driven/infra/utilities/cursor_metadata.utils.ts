import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { QueryMetaOptions } from "../../../../core/types/query_meta_options.type";
import { CursorMetadataResponse } from "../../../../core/types/cursor_metadata.type";
import { decodeCursor, encodeCursor } from "../../../../core/utilities/cursor"
import { BadQueryError } from "../../../../core/exceptions/bad_query.exception";

export function addCursorQuery(query: SelectQueryBuilder<ObjectLiteral>, metaOptions: QueryMetaOptions, queryId: string = "id"): SelectQueryBuilder<ObjectLiteral> {
    query.orderBy(queryId, "ASC");
    query.take(metaOptions.limit);
    if (metaOptions.direction === "last") {
        query.orderBy(queryId, "DESC");
    } else if (metaOptions.direction === "next") {
        if (!metaOptions.nextCursor) {
            throw new BadQueryError("nextCursor é necessário para a direção próxima");
        }
        const cursorId = decodeCursor(metaOptions.nextCursor).id
        query.where(`${queryId} > :cursorId`, { cursorId });

    } else if (metaOptions.direction === "prev") {
        if (!metaOptions.previousCursor) {
            throw new BadQueryError("previousCursor é necessário para a direção anterior");
        }
        const cursorId = decodeCursor(metaOptions.previousCursor).id
        query.where(`${queryId} < :cursorId`, { cursorId });
        query.orderBy(queryId, "DESC");
    }
    return query;
}

export function getCursorMetadata(results: ObjectLiteral[], metaOptions: QueryMetaOptions, totalDocs: number): CursorMetadataResponse {
    if (results.length === 0) {
        return {
            totalDocs,
            next: undefined,
            previous: undefined,
            hasNext: false,
            hasPrev: false,
        };
    }
    const hasMore = results.length >= metaOptions.limit;
    let nextCursor: string | undefined;
    let prevCursor: string | undefined;
    if (metaOptions.direction === "last") {
        nextCursor = undefined;
        prevCursor = encodeCursor({ id: results[results.length - 1].id });
    } else if (metaOptions.direction === "first") {
        nextCursor = hasMore ? encodeCursor({ id: results[results.length - 1].id }) : undefined;
        prevCursor = undefined;
    } else if (metaOptions.direction === "prev") {
        nextCursor = encodeCursor({ id: results[results.length - 1].id });
        prevCursor = hasMore ? encodeCursor({ id: results[0].id }) : undefined;
    } else {
        nextCursor = hasMore ? encodeCursor({ id: results[results.length - 1].id }) : undefined;
        prevCursor = encodeCursor({ id: results[0].id })
    }


    return {
        totalDocs,
        next: nextCursor,
        previous: prevCursor,
        hasNext: !!nextCursor,
        hasPrev: !!prevCursor,
    };
}