import { UserUseCase } from "../../../src/core/applications/user.use_case";
import { WordUseCase } from "../../../src/core/applications/word.use_case";
import { WordController } from "../../../src/core/controllers/word.controller";
import { WordAggregate } from "../../../src/core/domain/aggregates/word.aggregate";
import { UserEntity, WordEntity } from "../../../src/core/domain/entities";
import { WordPresenter } from "../../../src/core/presenters/word.presenter";

describe('WordController', () => {
    let wordController: WordController;
    let mockWordUseCase: jest.Mocked<WordUseCase>;
    let mockUserUseCase: jest.Mocked<UserUseCase>;

    beforeEach(() => {
        mockWordUseCase = {
            getWordDetail: jest.fn(),
            listWords: jest.fn(),
            favorite: jest.fn(),
            unfavorite: jest.fn(),
        } as any;

        mockUserUseCase = {
            getUserById: jest.fn(),
            addSearchHistory: jest.fn(),
        } as any;

        wordController = new WordController();
        (wordController as any).wordUseCase = mockWordUseCase;
        (wordController as any).userUseCase = mockUserUseCase;
    });

    describe('getWordDetail', () => {
        it('should return word details for a valid user and word', async () => {
            const mockUser = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
            const mockWordDetail = new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), [])

            mockUserUseCase.getUserById.mockResolvedValue(mockUser);
            mockWordUseCase.getWordDetail.mockResolvedValue(mockWordDetail);

            const result = await wordController.getWordDetail('example', 1);

            expect(mockUserUseCase.getUserById).toHaveBeenCalledWith(1);
            expect(mockWordUseCase.getWordDetail).toHaveBeenCalledWith('example');
            expect(mockUserUseCase.addSearchHistory).toHaveBeenCalledWith(mockUser, ['example']);
            expect(result).toEqual(WordPresenter.presentWordDetail(mockWordDetail));
        });

        it('should throw an error if the user is not found', async () => {
            mockUserUseCase.getUserById.mockResolvedValue(null);

            await expect(wordController.getWordDetail('example', 1)).rejects.toThrow('User not found');
        });

        it('should throw an error if the word is not found', async () => {
            const mockUser = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);

            mockUserUseCase.getUserById.mockResolvedValue(mockUser);
            mockWordUseCase.getWordDetail.mockResolvedValue(null);

            await expect(wordController.getWordDetail('example', 1)).rejects.toThrow('Word not found');
        });
    });

    describe('listWords', () => {
        it('should return a list of words', async () => {
            const mockWords = [
                new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), []),
                new WordAggregate(new WordEntity(2, 'example', {}, new Date(), new Date(), null), [])
            ];
            const options = { limit: 10, offset: 0 };

            mockWordUseCase.listWords.mockResolvedValue(mockWords);

            const result = await wordController.listWords(options);

            expect(mockWordUseCase.listWords).toHaveBeenCalledWith(options);
            expect(result).toEqual(WordPresenter.presentWords(mockWords));
        });
    });

    describe('favoriteWord', () => {
        it('should favorite a word for a valid user', async () => {
            const mockUser = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);

            mockUserUseCase.getUserById.mockResolvedValue(mockUser);

            await wordController.favoriteWord('example', 1);

            expect(mockUserUseCase.getUserById).toHaveBeenCalledWith(1);
            expect(mockWordUseCase.favorite).toHaveBeenCalledWith('example', mockUser);
        });

        it('should throw an error if the user is not found', async () => {
            mockUserUseCase.getUserById.mockResolvedValue(null);

            await expect(wordController.favoriteWord('example', 1)).rejects.toThrow('User not found');
        });
    });

    describe('unfavoriteWord', () => {
        it('should unfavorite a word for a valid user', async () => {
            const mockUser = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);

            mockUserUseCase.getUserById.mockResolvedValue(mockUser);

            await wordController.unfavoriteWord('example', 1);

            expect(mockUserUseCase.getUserById).toHaveBeenCalledWith(1);
            expect(mockWordUseCase.unfavorite).toHaveBeenCalledWith('example', mockUser);
        });

        it('should throw an error if the user is not found', async () => {
            mockUserUseCase.getUserById.mockResolvedValue(null);

            await expect(wordController.unfavoriteWord('example', 1)).rejects.toThrow('User not found');
        });
    });
});