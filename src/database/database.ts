interface IUser {
    id: string;
    nome: string;
    lvl: number;
    vida: number;
    stamina?: number;
}

interface IGame {
    id: string;
    masterId: string;
    nameGame: string;
    players: [IUser]
    created_at: Date;                                                                             
}



export class DatabaseRPG {
    database: IGame[];

    constructor() {
        this.database = [];
    }
}
