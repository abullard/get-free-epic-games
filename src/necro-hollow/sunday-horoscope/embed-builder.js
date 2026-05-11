import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { join } from 'path';

export const buildAndSendEmbeds = async (client, horoscopes) => {
    const horoscopeAndChannel = horoscopes.map((h) => {
        const zodiac = h.sign;

        return {
            ...h,
            channelId: String(process.env[`CHANNEL_ID_${zodiac.toUpperCase()}`]).trim(),
            image: join('src', 'necro-hollow', 'sunday-horoscope', 'assets', zodiac) + '.png'
        };
    });

    const promises = horoscopeAndChannel.map(async (hac) => await buildHoroscopeEmbeds(client, hac));

    try {
        await Promise.all(promises);
    } catch (e) {
        console.error('ERROR: ', e)
    }
};

const buildHoroscopeEmbeds = async (client, horoscopeAndChannel) => {
    const { sign, date, horoscope, channelId, image } = horoscopeAndChannel;
    const { reading, metadata } = horoscope;
    const metadataMap = {
        positivity: 'Positivity',
        luckyNumber: 'Lucky Number',
        luckyColor: 'Lucky Color',
        moodOfTheDay: 'Mood of the Day',
    }


    const channelRef = await client.channels.fetch(channelId);
    const zodiacPhoto = new AttachmentBuilder(image);

    const gameEmbed = new EmbedBuilder()
        .setColor(0xDAB5F8)
        .setTitle(sign)
        .setDescription(reading)
        .setImage(`attachment://${sign}.png`)
        .addFields(
            {
                name: metadataMap.positivity,
                value: metadata[metadataMap.positivity],
                inline: true,
            },
            {
                name: metadataMap.luckyNumber,
                value: metadata[metadataMap.luckyNumber],
                inline: true,
            },
            {
                name: metadataMap.luckyColor,
                value: metadata[metadataMap.luckyColor],
                inline: true,
            },
            {
                name: metadataMap.moodOfTheDay,
                value: metadata[metadataMap.moodOfTheDay],
                inline: true,
            },
            {
                name: 'Date',
                value: date,
                inline: true,
            }
        );

    return channelRef.send({
        embeds: [gameEmbed],
        files: [zodiacPhoto]
    });
};
