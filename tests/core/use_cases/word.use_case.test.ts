import { WordUseCase } from "../../../src/core/applications/word.use_case";
import { WordAggregate } from "../../../src/core/domain/aggregates/word.aggregate";
import { UserEntity, WordEntity } from "../../../src/core/domain/entities";
import { WordRepository } from "../../../src/core/repositories/word.repository";
import { ListWordsOptions } from "../../../src/core/types/list_word_options.type";

describe('WordUseCase', () => {
    let wordRepositoryMock: jest.Mocked<WordRepository>;
    let wordUseCase: WordUseCase;

    beforeEach(() => {
        wordRepositoryMock = {
            getWordDetail: jest.fn(),
            list: jest.fn(),
            findByWord: jest.fn(),
            favorite: jest.fn(),
            unfavorite: jest.fn(),
        } as unknown as jest.Mocked<WordRepository>;

        wordUseCase = new WordUseCase(wordRepositoryMock);
    });

    describe('getWordDetail', () => {
        it('should return word details when the word exists', async () => {
            const word = 'example';
            const wordAggregate = new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), [])
            wordRepositoryMock.getWordDetail.mockResolvedValue(wordAggregate);

            const result = await wordUseCase.getWordDetail(word);

            expect(wordRepositoryMock.getWordDetail).toHaveBeenCalledWith(word);
            expect(result).toEqual(wordAggregate);
        });

    });

    describe('listWords', () => {
        it('should return a list of words based on options', async () => {
            const options: ListWordsOptions = { limit: 10 };
            const wordAggregates = new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), [])
            wordRepositoryMock.list.mockResolvedValue([wordAggregates]);

            const result = await wordUseCase.listWords(options);

            expect(wordRepositoryMock.list).toHaveBeenCalledWith(options);
            expect(result).toEqual([wordAggregates]);
        });
    });

    describe('favorite', () => {
        it('should favorite a word for a user', async () => {
            const word = 'example';
            const user = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
            const foundWord = new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), [])
            wordRepositoryMock.findByWord.mockResolvedValue(foundWord);

            await wordUseCase.favorite(word, user);

            expect(wordRepositoryMock.findByWord).toHaveBeenCalledWith(word);
            expect(wordRepositoryMock.favorite).toHaveBeenCalledWith(word, user.id);
        });

        it('should throw an error if the word does not exist', async () => {
            const word = 'nonexistent';
            const user = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
            wordRepositoryMock.findByWord.mockResolvedValue(null);

            await expect(wordUseCase.favorite(word, user)).rejects.toThrow('Word not found');
        });

        it('should throw an error if the word is already favorited by the user', async () => {
            const word = 'example';
            const user = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
            const foundWord = new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), [user])
            wordRepositoryMock.findByWord.mockResolvedValue(foundWord);

            await expect(wordUseCase.favorite(word, user)).rejects.toThrow('Word already favorited');
        });
    });

    describe('unfavorite', () => {
        it('should unfavorite a word for a user', async () => {
            const word = 'example';
            const user = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
            const foundWord = new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), [user])
            wordRepositoryMock.findByWord.mockResolvedValue(foundWord);

            await wordUseCase.unfavorite(word, user);

            expect(wordRepositoryMock.findByWord).toHaveBeenCalledWith(word);
            expect(wordRepositoryMock.unfavorite).toHaveBeenCalledWith(word, user.id);
        });

        it('should throw an error if the word does not exist', async () => {
            const word = 'nonexistent';
            const user = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
            wordRepositoryMock.findByWord.mockResolvedValue(null);

            await expect(wordUseCase.unfavorite(word, user)).rejects.toThrow('Word not found');
        });

        it('should throw an error if the word is not favorited by the user', async () => {
            const word = 'example';
            const user = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
            const foundWord = new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), [])
            wordRepositoryMock.findByWord.mockResolvedValue(foundWord);

            await expect(wordUseCase.unfavorite(word, user)).rejects.toThrow('Word already not favorited');
        });
    });
});