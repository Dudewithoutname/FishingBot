import { CommandInteraction, MessageEmbed } from 'discord.js';
import { PlayerController } from '../Database/playerController';
import { ItemManager } from '../Items/itemManager';
import { client } from '../main';
import { Command } from '../Managers/commandManager';
import { Item, ItemRarity, ItemType, rarityToString } from '../Models/Item';
import { Player } from '../Models/Player';

export const body: Command = {
    name: 'fish',
    description: 'Catch yourself a fishy friend',
    execute: async (interaction: CommandInteraction) => {
        const player: (Player & {_id: any}) | null = await PlayerController.Get(interaction.member.user.id);

        if(player == null){
            const embed = new MessageEmbed()
                .setColor('#3a44ff')
                .setAuthor('Yoo you aren\'t fisher yet, but you can become one via /iwanttobefisher');
            
            await interaction.reply({embeds: [embed]});
            return;
        }
        
        await animateWaiting(interaction);

        const chance: number = Math.floor((Math.random() * 10001)) / 100;
        player.statFished++;

        if(chance == 0.01){
            await interaction.editReply('OMG BRO, you haven\'t caught anything with (0.01% chance) 💦');

            player.statLuck += getLuck(ItemRarity.BASIC, chance);
        }
        else{
            const rarity = getRarity(chance);
            player.statLuck += getLuck(rarity, chance);

            if(rarity == ItemRarity.BASIC){
                await interaction.editReply('Unfortunately, you haven\'t caught anything 💦');
            } 
            else{
                // this retarded language doesn't have a fucking cloning func, i tried everything
                // and this comes as simpliest way
                const fish : Item = JSON.parse(JSON.stringify(getValidFish(rarity)));
                const size = getFishSize(fish);

                await interaction.editReply(`You've caught **${fish.name}** *(${(size < 1000)? `${size}cm`: `${size / 1000}m`})* *(${rarityToString(fish.rarity)})* 🎣`);

                fish.data.size = size;
                delete fish.data.maxSize;
                delete fish.data.minSize;
                
                player.inventory.push(fish);
            }
        }
        await player?.save();
    }
};
async function animateWaiting(interaction: CommandInteraction){
    const waterEmoji = client.emojis.cache.get('921955651297615872');
    const fishEmoji = client.emojis.cache.get('921956013022785546');

    await interaction.reply(`${waterEmoji}${waterEmoji}${waterEmoji}${waterEmoji}${fishEmoji}`);
    await sleep(1000);
    await interaction.editReply(`${waterEmoji}${waterEmoji}${waterEmoji}${fishEmoji}${waterEmoji}`);
    await sleep(1000);
    await interaction.editReply(`${waterEmoji}${waterEmoji}${fishEmoji}${waterEmoji}${waterEmoji}`);
    await sleep(1000);
    await interaction.editReply(`${waterEmoji}${fishEmoji}${waterEmoji}${waterEmoji}${waterEmoji}`);
    await sleep(1000);
    await interaction.editReply(`🎣${waterEmoji}${waterEmoji}${waterEmoji}${waterEmoji}`);
    await sleep(1000);
}

function getLuck(rarity: ItemRarity, chance: number) : number{
    if(chance == 0.01) return -100;

    switch(rarity){
        case ItemRarity.BASIC:
            return -1;
        case ItemRarity.COMMON:
            return 0;
        case ItemRarity.UNCOMMON:
            return 1;
        case ItemRarity.RARE:
            return 3;
        case ItemRarity.EPIC:
            return 5;
        case ItemRarity.LEGENDARY:
            return 10;
        case ItemRarity.EXOTIC:
            return 25;
    }
}

function getRarity(chance: number) : ItemRarity{
    if(chance > 35.5)
        return (chance >= 65)? ItemRarity.BASIC : ItemRarity.COMMON;
    else if(chance > 15.68)
        return ItemRarity.UNCOMMON;
    else if(chance > 1.68)
        return ItemRarity.RARE;
    else if(chance > 0.18)
        return ItemRarity.EPIC;
    else if(chance > 0.03)
        return ItemRarity.LEGENDARY;
    else
        return ItemRarity.EXOTIC;
}

function getValidFish(rarity: ItemRarity) : Item
{
    const fish: Item[] = ItemManager.Items.filter(item => item.type == ItemType.FISH && item.rarity == rarity);
    const random: number = Math.floor((Math.random() * fish.length));

    return fish[random];
}

function getFishSize(fish: Item): number{
    const chance: number = Math.floor((Math.random() * 1000));
    let avg: number, minAvg: number, rnd: number = Math.floor(Math.random() * 2);

    // Avarage 74.8%
    if(chance > 252){
        avg = (fish.data.maxSize + fish.data.minSize) / 2;
        minAvg = (fish.data.maxSize - fish.data.maxSize) / 100 * 30;

        return (rnd == 0)? Math.floor(Math.random() * minAvg) + avg : avg - Math.floor(Math.random() * minAvg);
    }
    // Small 25%
    else if(chance > 12){     
        avg = fish.data.minSize;
        minAvg = fish.data.minSize / 100 * 15;

        return avg + Math.floor(Math.random() * minAvg);
    }
    // Big 1%
    else if(chance > 2){
        avg = fish.data.maxSize - fish.data.maxSize / 100 * 5;
        minAvg = (fish.data.maxSize - fish.data.maxSize) / 100 * 15;

        return avg - Math.floor(Math.random() * minAvg);
    }
    // Huge 0.2%
    else{
        avg = fish.data.maxSize;
        minAvg = (fish.data.maxSize) / 100 * 7.5;

        return avg - Math.floor(Math.random() * minAvg);
    }
}
function sleep(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  