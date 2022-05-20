import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { v4 as uuid } from 'uuid';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Inicia um novo jogo jogo de RPG')
        .addStringOption(option => option.setName('nomedorpg').setDescription('Coloque o nome do rpg').setRequired(true))
        .addNumberOption(option => option.setName('players').setDescription('numero de players que irão jogar').setRequired(true))
        ,
    async execute(interaction: CommandInteraction) {

        const nomeDoRPG = interaction.options.getString('nomedorpg')
        const mestreDoRPG = interaction.member?.user;

        const playersSelected = interaction.options.getNumber('players');

        if(mestreDoRPG?.bot === true) {
            return interaction.reply('Bots não podem criar partidas de RPGs 🤖')
        }

        const newGame = {
            id: uuid(),
            nameGame: nomeDoRPG,
            playersNumber: playersSelected,
            masterid: mestreDoRPG?.id,
            created_at: Date(),
        }
                                                          
        return;
    }
}
