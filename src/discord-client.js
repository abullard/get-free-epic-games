import { Client, Events, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import { mapFreeEpicGames } from './epic-games.js';

export const loginWithDiscord = () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.once(Events.ClientReady, async (readyClient) => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
        // AJB TODO - extract main here
        const result = await mapFreeEpicGames();

        await sendMessage(client, result);

        process.exit(0);
    });

    client.login(process.env.DISCORD_TOKEN);

    return client;
};

export const sendMessage = async (client, freeGames) => {
    const channel = await client.channels.fetch('1468456945529917564');

    // TODO extract to function
    const messages = await channel.messages.fetch({ limit: 2, cache: false });
    const previouslySentGames = messages.map((x) => {
        const hasEmbeds = x.embeds.length;
        if (hasEmbeds) {
            return x.embeds[0].data.footer?.text;
        }
    });

    const toSend = [];
    freeGames.map(async (fg) => {
        if (previouslySentGames.includes(fg.slug)) {
            console.info(`dont need to send, already sent ${fg.title}`);
            return;
        }

        const exampleEmbed = new EmbedBuilder()
            .setColor(0x5bbb56)
            .setTitle(`${fg.title} is Free on Epic Games!`)
            .setURL(`https://store.epicgames.com/en-US/p/${fg.slug}`)
            .setDescription(fg.description)
            .setImage(fg.thumbnail)
            .addFields(
                {
                    name: 'Cost',
                    value: '$0.00',
                    inline: true,
                },
                {
                    name: 'Developer',
                    value: fg.developer,
                    inline: true,
                },
                {
                    name: 'Status',
                    value: fg.status,
                    inline: true,
                }
            )
            .setFooter({ text: `${fg.slug}` });

        toSend.push(channel.send({ embeds: [exampleEmbed] }));
    });

    await Promise.all(toSend);
};
