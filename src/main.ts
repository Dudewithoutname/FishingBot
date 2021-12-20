import { CacheType, Client, Intents, Interaction } from 'discord.js';
import { config } from './config';
import { CommandManager } from './Managers/commandManager';
import { connect } from 'mongoose';

export const client: Client = new Client({intents: Intents.FLAGS.GUILDS})
const commandManager: CommandManager = new CommandManager();

client.once('ready', async () => {
	try{
		await connect('mongodb://localhost:27017/test');
		console.log('[DB] connected');
	}
	catch(err: any){
		console.log(`[DB] failed to connect to database ${err}`);
		return;
	}

    commandManager.registerCommands();
	commandManager.deployCommands();
    console.log('[Bot] Ready!');
});

client.on('interactionCreate', async (interaction : Interaction<CacheType>)  => {
	if (!interaction.isCommand()) return;
	await commandManager.executeCommand(interaction);
});

client.login(config.token);
