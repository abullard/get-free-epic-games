import { getHoroscopes } from './horoscope.js';
import { buildAndSendEmbeds } from './embed-builder.js';

export const readyHandler = async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    const result = await getHoroscopes();

    await buildAndSendEmbeds(readyClient, result);

    process.exit(0);
};
