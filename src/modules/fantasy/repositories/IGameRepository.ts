import { Game } from '../entities/Game';

interface ICreateGameDTO {
    masterId: string;
}

interface IGameRepository {
    create({ masterId }: ICreateGameDTO): Promise<void>;
}

export { IGameRepository };