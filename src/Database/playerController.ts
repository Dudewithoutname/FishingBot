import { Player, PlayerModel } from "../Models/Player"

export class PlayerController{
    static Get = async (id: string): Promise<(Player & {_id: any}) | null>  =>{
        return await PlayerModel.findOne({discordID: id}).exec();
    }

    static Add = async (id: string): Promise<(Player & {_id: any}) | null> =>{
        return await PlayerModel.create( 
            {
                discordID: id, 
                inventory: [],
                statFished: 0, 
                statLuck: 0,
            });
    }
}