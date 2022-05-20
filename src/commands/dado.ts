import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dado')
        .setDescription('Dado para rodar')
        .addStringOption(option => option.setName('vezes').setDescription('Numero de vezes que o dado sera lançado [Min: 1] [Max: 10] [Padrão: 1]')),
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('4')
                .setLabel('4')
                .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('8')
                .setLabel('8')
                .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('10')
                .setLabel('10')
                .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('12')
                .setLabel('12')
                .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('20')
                .setLabel('20')
                .setStyle('PRIMARY')
            )


        const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('DADO')
                .setDescription('Escolha um dos dados')
                .setFooter({ text: 'Magic Bot • RPG' })


        const collector = interaction.channel?.createMessageComponentCollector({ time: 15000 });


        let numeroVezes = interaction.options.data[0]?.value ?? 1;

        if(numeroVezes > 10 || numeroVezes < 1) {
            return await interaction.reply({ embeds: [embed.setTitle('ERRO: Número inserido de forma errada!').setDescription(' [Máximo de lançamentos: 10] [Mínimo de lançamentos: 1]').setColor('RED')], components: [] })
        }

        await interaction.reply({ embeds: [embed], components: [row] });            

        collector?.on('collect', async i => {
            try {
                
                for(let j = 0; j < numeroVezes; j++){
                    const numeroGerado = Math.floor(Math.random() * (Number(i.customId) - 1 + 1)) + 1;
                    embed.addField(`Dado ${j+1}: `, `${numeroGerado}`, true)
                    
                }
                return await i.update({ embeds: [embed.setDescription('Dado(s) lançado(s)')], components: [] })
            } catch (error) {
                return await i.update({ embeds: [embed.setDescription('**ERROR: Algo deu errado! 🤖**')], components: [] })
            }
        })

        return;
    }
}