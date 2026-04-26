import { EmbedBuilder } from 'discord.js';
import { necroHollowZodiacChannelMap } from './data.js';

export const buildAndSendEmbeds = async (client, horoscopes) => {
    const horoscopeAndChannel = horoscopes.map(async (h) => {
        const channelId = necroHollowZodiacChannelMap[h.zodiac];
        const channelRef = await client.channels.fetch(channelId);
        
        return {
            ...h,
            channelRef,
        }
    });

    const promises = horoscopeAndChannel.map((hac) => buildGameEmbeds(hac));

    try {
        await Promise.all(promises);
    } catch (e) {
        console.error('ERROR: ', e)
    }
};

const buildGameEmbeds = (horoscopeAndChannel) => {
    const channel = horoscopeAndChannel.channelRef;
    
    const gameEmbed = new EmbedBuilder()
        .setColor(horoscopeAndChannel.color)
        .setTitle(horoscopeAndChannel.zodiac)
        .setDescription(horoscopeAndChannel.horoscope)
        // .setImage(horoscopeAndChannel.thumbnail)
        .addFields(
            {
                name: 'date',
                value: horoscopeAndChannel.date,
                inline: true,
            }
        );

    return channel.send({ embeds: [gameEmbed] });
};
