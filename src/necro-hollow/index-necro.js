import { loginWithDiscord } from '../discord-client.js';
import { readyHandler } from './handler.js';

const run = async () => {
    // using https://api-ninjas.com/api/horoscope for daily horoscopes
    loginWithDiscord(process.env.DISCORD_TOKEN_NECRO, readyHandler);
};

run();
