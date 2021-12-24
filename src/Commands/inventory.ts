import { CommandInteraction, MessageEmbed } from 'discord.js';
import { PlayerController } from '../Database/playerController';
import { Command, CommandParameterType } from '../Managers/commandManager';
import { Item, ItemType, rarityToEmoji, rarityToString } from '../Models/Item';
import { Player } from '../Models/Player';

export const body: Command = {
    name: 'inventory',
    description: 'Show me watchu\' got bro',
    parameters: [
        {
            name: 'page',
            description: 'number',
            type: CommandParameterType.NUMBER,
            required: false
        }
    ],
    execute: async (interaction: CommandInteraction) => {
        const player: (Player & { _id: any }) | null = await PlayerController.Get(interaction.member.user.id)
        let page: any = interaction.options.data[0]?.value || 0;

        if (page <= 0) page = 1;

        if (player == null) {
            const embed: MessageEmbed = new MessageEmbed()
                .setColor('#3a44ff')
                .setAuthor('Yoo you aren\'t fisher yet, but you can become one via /iwanttobefisher');

            await interaction.reply({ embeds: [embed] });

            return;
        }

        const embed: MessageEmbed = new MessageEmbed()
            .setColor('#228b22')
            .setAuthor(`${interaction.member.user.username}'s inventory`, interaction.user.displayAvatarURL({ size: 256, dynamic: true }))
            .setDescription(`**Luck:** ${player.statLuck}  |  **Fished:** ${player.statFished}x`);

        const invPage: Item[] = player.inventory.filter((value: Item, index: number) => index < page * 12 && index >= (page - 1) * 12);

        invPage.forEach((item: Item, index: number) => {
            embed.addField(`:fish: ${item.name} [${index + 11 * (page - 1)}]`, (item.type == ItemType.FISH) ? ` Rarity: \`${rarityToEmoji(item.rarity)} ${rarityToString(item.rarity)}\` \n Size: \`${(item.data.size < 1000) ? `${item.data.size}cm` : `${item.data.size / 1000}m`}\`` : '', true);
        });

        await interaction.reply({ embeds: [embed] });
    }
};
