import { buildAndSendMessage } from './message-builder.js';
import { pullThreeMajorArcana } from './major-arcana.js';

export const readyHandler = async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    const majorArcana = pullThreeMajorArcana();

    await buildAndSendMessage(readyClient, majorArcana);

    process.exit(0);
};
