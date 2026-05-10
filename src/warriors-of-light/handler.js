import { mapFreeEpicGames } from './epic-games.js';
import { buildAndSendEmbeds } from './embed-builder.js';

export const readyHandler = async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    const result = await mapFreeEpicGames();

    await buildAndSendEmbeds(readyClient, result);

    process.exit(0);
};
