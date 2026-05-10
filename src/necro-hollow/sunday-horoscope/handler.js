import { scrapeHoroscope } from './horoscope.js';
import { buildAndSendEmbeds } from './embed-builder.js';

export const readyHandler = async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    const result = await scrapeHoroscope();
        
    await buildAndSendEmbeds(readyClient, result);

    process.exit(0);
};
