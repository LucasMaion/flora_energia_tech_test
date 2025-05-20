import { UserUseCase } from "../../../src/core/applications/user.use_case";
import { UserController } from "../../../src/core/controllers/user.controller";
import { WordAggregate } from "../../../src/core/domain/aggregates/word.aggregate";
import { UserEntity, WordEntity } from "../../../src/core/domain/entities";

describe('UserController - getUserFavorites', () => {
    let userController: UserController;
    let mockUserUseCase: jest.Mocked<UserUseCase>;

    beforeEach(() => {
        mockUserUseCase = {
            getUserById: jest.fn(),
            getUserFavorites: jest.fn(),
        } as unknown as jest.Mocked<UserUseCase>;

        userController = new UserController();
        (userController as any).userUseCase = mockUserUseCase;
    });

    it('should return formatted favorites when the user exists and has favorites', async () => {
        const mockUser = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
        const mockFavorites = new WordAggregate(new WordEntity(1, 'example', {}, new Date(), new Date(), null), [mockUser])
        const formattedFavorites = ['example'];

        mockUserUseCase.getUserById.mockResolvedValue(mockUser);
        mockUserUseCase.getUserFavorites.mockResolvedValue([mockFavorites]);

        const result = await userController.getUserFavorites(1);

        expect(mockUserUseCase.getUserById).toHaveBeenCalledWith(1);
        expect(mockUserUseCase.getUserFavorites).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(formattedFavorites);
    });

    it('should throw an error when the user does not exist', async () => {
        mockUserUseCase.getUserById.mockResolvedValue(null);

        await expect(userController.getUserFavorites(1)).rejects.toThrow('User not found');

        expect(mockUserUseCase.getUserById).toHaveBeenCalledWith(1);
        expect(mockUserUseCase.getUserFavorites).not.toHaveBeenCalled();
    });

    it('should return an empty array when the user exists but has no favorites', async () => {
        const mockUser = new UserEntity(1, "mock@email.email", "mockPassword", "mockName", new Date(), new Date(), null);
        const mockFavorites: any[] = [];
        const formattedFavorites: any[] = [];

        mockUserUseCase.getUserById.mockResolvedValue(mockUser);
        mockUserUseCase.getUserFavorites.mockResolvedValue(mockFavorites);
        // mockWordPresenter.presentWords.mockReturnValue(formattedFavorites);

        const result = await userController.getUserFavorites(1);

        expect(mockUserUseCase.getUserById).toHaveBeenCalledWith(1);
        expect(mockUserUseCase.getUserFavorites).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(formattedFavorites);
    });
});