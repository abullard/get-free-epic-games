import { EmbedBuilder } from 'discord.js';

export const buildAndSendEmbeds = async (client, freeGames) => {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    const previouslySentGames = await fetchPreviouslyNotifiedGames(channel);

    const promises = freeGames.map((fg) => buildGameEmbeds(channel, fg, previouslySentGames));

    try {
        await Promise.all(promises);
    } catch (e) {
        console.error('ERROR: ', e);
    }
};

const fetchPreviouslyNotifiedGames = async (channel) => {
    const messages = await channel.messages.fetch({ limit: 5, cache: false });
    return messages.map((x) => {
        const hasEmbeds = x.embeds.length;
        if (hasEmbeds) {
            return x.embeds[0].data.footer?.text;
        }
    });
};

const buildGameEmbeds = (channel, freeGame, previouslySentGames) => {
    if (previouslySentGames.includes(freeGame.slug)) {
        console.info(`Not sending ${freeGame.title}—channel already notified.`);
        return;
    }

    const gameEmbed = new EmbedBuilder()
        .setColor(0x5bbb56)
        .setTitle(`${freeGame.title} is Free on Epic Games!`)
        .setURL(`https://store.epicgames.com/en-US/p/${freeGame.slug}`)
        .setDescription(freeGame.description)
        .setImage(freeGame.thumbnail)
        .addFields(
            {
                name: 'Cost',
                value: '$0.00',
                inline: true,
            },
            {
                name: 'Developer',
                value: freeGame.developer,
                inline: true,
            }
        )
        .setFooter({ text: `${freeGame.slug}` });

    return channel.send({ embeds: [gameEmbed] });
};
