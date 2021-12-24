import { CommandInteraction, MessageEmbed } from "discord.js";
import { PlayerController } from "../Database/playerController";
import { Command } from "../Managers/commandManager";
import { Player } from "../Models/Player";

export const body: Command = {
    name: 'iwannabefisher',
    description: 'it\'s well known that fishers have longer ... rod :)',
    execute: async (interaction: CommandInteraction) => {
        const player: (Player & { _id: any }) | null = await PlayerController.Get(interaction.member.user.id);

        if (player != null) {
            const embed = new MessageEmbed()
                .setColor('#ff2035')
                .setAuthor('You\'re now fisher, enjoy longer ... rod :)');

            await interaction.reply({ embeds: [embed] });
        }
        else {
            await PlayerController.Add(interaction.member.user.id);

            const embed = new MessageEmbed()
                .setColor('#b2ec5d')
                .setAuthor('Watchu\' want man, i can\'t make yourself a fricking president!');

            await interaction.reply({ embeds: [embed] });
        }
    }
};