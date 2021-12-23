import { Item, ItemType } from '../Models/Item';
import rawItems from './Items.json';

export class ItemManager{
    public static Items : Item[] = rawItems as Item[];
    
    public static GetItem = (itemId : number) : Item => { 
        return this.Items.filter((item: Item) => item.id == itemId)[0];
    }
}
