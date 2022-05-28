import { PrismaClient } from "@prisma/client";
import { IGameRepository } from "../IGameRepository";

class GameRepository implements IGameRepository {

    private prisma = new PrismaClient();

    constructor() {} 

    async create({  }) {
        const resultado = this.prisma.game.create({
            data: {

            }
        })
    }

}
