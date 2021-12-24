export interface Item {
    id: number;
    name: string;
    type: ItemType;
    rarity: ItemRarity;
    data: any;
}

// don't ask me why
export enum ItemRarity {
    EXOTIC = 6,
    LEGENDARY = 5,
    EPIC = 4,
    RARE = 3,
    UNCOMMON = 2,
    COMMON = 1,
    BASIC = 0,
}

export enum ItemType {
    FISH = 'FISH',
    ITEM = 'ITEM',
    MATERIAL = 'MATERIAL',
    FISHING_ROD = 'FISHING_ROD',
}

export function rarityToString(rarity: ItemRarity): string {
    switch (rarity) {
        case ItemRarity.EXOTIC:
            return 'Exotic';
        case ItemRarity.LEGENDARY:
            return 'Legendary';
        case ItemRarity.EPIC:
            return 'Epic';
        case ItemRarity.RARE:
            return 'Rare';
        case ItemRarity.UNCOMMON:
            return 'Uncommon';
        case ItemRarity.COMMON:
            return 'Common';
        case ItemRarity.BASIC:
            return 'Normal';
        default:
            return 'Unknown';
    }
}

export function rarityToEmoji(rarity: ItemRarity): string {
    switch (rarity) {
        case ItemRarity.EXOTIC:
            return '🔴';
        case ItemRarity.LEGENDARY:
            return '🟡';
        case ItemRarity.EPIC:
            return '🟣';
        case ItemRarity.RARE:
            return '🔵';
        case ItemRarity.UNCOMMON:
            return '🟢';
        case ItemRarity.COMMON:
            return '⚪';
        case ItemRarity.BASIC:
            return '⚫';
        default:
            return '💢';
    }
}