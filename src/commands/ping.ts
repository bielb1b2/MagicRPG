import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Retorna latência'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!');
    }
}