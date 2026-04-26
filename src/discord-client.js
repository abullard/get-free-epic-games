import { Client, Events, GatewayIntentBits } from 'discord.js';

export const loginWithDiscord = (token, readyHandler) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.once(Events.ClientReady, readyHandler);
    client.login(token);

    return client;
};
