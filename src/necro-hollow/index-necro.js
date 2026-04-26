import { loginWithDiscord } from '../discord-client.js';
import { readyHandler } from './handler.js';

const run = async () => {
    loginWithDiscord(process.env.DISCORD_TOKEN_NECRO, readyHandler);
};

run();
