import { Schema, model, Document } from 'mongoose';
import { Item } from './Item';

export interface Player extends Document{
    discordID: string;
    statFished: number;
    statLuck: number; 
    inventory: Item[];
}

const playerSchema = new Schema<Player>({
    discordID: { type: String, required: true },
    statFished: { type: Number, required: true },
    statLuck: { type: Number, required: true },  
    inventory: { type: [Object], required: true },
});
  
export const PlayerModel = model<Player>('Players', playerSchema);
  
  