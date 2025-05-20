import { WordAggregate } from "../domain/aggregates/word.aggregate";

export class WordPresenter {
    static presentWordDetail(aggregate: WordAggregate): any {
        return aggregate.word.wordDetail;
    }

    static presentWords(aggregates: WordAggregate[]) {
        return aggregates.map((aggregate) => aggregate.word.word);
    }
}
