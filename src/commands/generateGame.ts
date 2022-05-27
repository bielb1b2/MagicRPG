import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { v4 as uuid } from 'uuid';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Inicia um novo jogo jogo de RPG')
        .addStringOption(option => option.setName('nomedorpg').setDescription('Coloque o nome do rpg').setRequired(true)),

    async execute(interaction: CommandInteraction) {

        const nomeDoRPG = interaction.options.getString('nomedorpg')
        const mestreDoRPG = interaction.member?.user;


        if(mestreDoRPG?.bot === true) {
            return interaction.reply('Bots não podem criar partidas de RPGs 🤖')
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('participar')
                .setLabel('Participar ')
                .setStyle('SUCCESS')
                .setEmoji('⚔')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('iniciar')
                .setLabel('Iniciar RPG')
                .setStyle('PRIMARY')
                .setEmoji('🧙‍♂️')
            )

        const collector = interaction.channel?.createMessageComponentCollector({ time: 40000 });

        const hora = new Date();

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Nova Partida: __${nomeDoRPG}__`)
            .setAuthor({ name: `O Mestre: ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({ format: "gif", size: 1024, dynamic: true })}` })
            .setDescription("Clique em participar para entrar")
            .addFields({ name: "Participantes", value: "Nenhum" })
            .setImage('https://i0.wp.com/www.thexboxhub.com/wp-content/uploads/2019/02/Crossroads-Inn-Key_Art.jpg?resize=640%2C275&ssl=1')
            .setFooter({ text: `MagicRPG   •   ${hora.getHours()}:${hora.getMinutes()}   •   ${hora.getDate()}/${hora.getMonth() + 1}/${hora.getFullYear()}` })

        await interaction.reply({ embeds: [embed], components: [row] })
        
        const players: any[] = []

        collector?.on('collect', async i => {
            if (i.customId === 'participar') {

                const user = i.user;

                const userAlreadyExists = players.find(item => item.id === user.id);

                if(!userAlreadyExists){
                    const player = {
                        id: user.id,
                        username: user.username
                    }
    
                    players.push(player);

                    embed.fields[0].value = `${players.map(item => `<@${item.id}>`)}`;

                    
                }
                await interaction.editReply({ embeds: [embed], components: [row] });
            } else if(i.customId === "iniciar") {

                const user = i.user;

                if(user.id === mestreDoRPG?.id) {
                    embed.addField("Game Iniciado", "Não é mais possível entrar nesta partida")
                    embed.setTitle(`Partida Iniciada: __${nomeDoRPG}__`);
                    embed.setColor("BLUE");

                    await interaction.editReply({ embeds: [embed], components: [] })
                }
            }
        });                                               
    }
}
