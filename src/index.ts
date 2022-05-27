import { Client, Collection, Intents, } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import { token, clientId, guildId } from '../config.json';
import { PrismaClient } from '@prisma/client';

import path from 'node:path'
import fs from 'fs';
import { ICommands } from './@types';

interface IClient extends Client {
    commands: Collection<any, any>
}

const prisma = new PrismaClient();

const client = new Client({  
    intents: [Intents.FLAGS.GUILDS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
}) as IClient;

client.once('ready', () => {
    console.log('I\'m up!');
})

Object.assign(client, {
    commands: new Collection()
})

const commands = [];
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: ICommands = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Comandos carregados!'))
    .catch(console.error);
})();

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command: ICommands = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction)
    } catch (error) {
        console.log(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
})

client.login(token);