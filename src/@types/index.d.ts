import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "discord.js";

interface ICommands {
    data: SlashCommandBuilder,
    execute(Interaction: Interaction): Promise<Interaction>
}