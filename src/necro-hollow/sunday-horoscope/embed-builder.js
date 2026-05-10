import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { necroHollowZodiacChannelMap } from './types.js';
import { join } from 'path';

export const buildAndSendEmbeds = async (client, horoscopes) => {
    const horoscopeAndChannel = horoscopes.map((h) => {
        const zodiac = h.sign;
        const channelId = String(process.env[`CHANNEL_ID_${zodiac.toUpperCase()}`]).trim();

        return {
            ...h,
            roleId: process.env[`ROLE_ID_${zodiac.toUpperCase()}`],
            channelId: String(process.env[`CHANNEL_ID_${zodiac.toUpperCase()}`]).trim(),
            image: join('src', 'necro-hollow', 'sunday-horoscope', 'assets', zodiac) + '.png'
        }
    });

    const promises = horoscopeAndChannel.map(async (hac) => await buildGameEmbeds(client, hac));

    try {
        await Promise.all(promises);
    } catch (e) {
        console.error('ERROR: ', e)
    }
};

const buildGameEmbeds = async (client, horoscopeAndChannel) => {
    const { sign, date, horoscope, roleId, channelId, image } = horoscopeAndChannel;
    console.log('AJB: buildGameEmbeds sign: ', sign);
    console.log('AJB: channelId: ', typeof channelId);

    const channelRef = await client.channels.fetch(channelId);
    const zodiacPhoto = new AttachmentBuilder(image);

    const gameEmbed = new EmbedBuilder()
        .setColor(0xDAB5F8)
        .setTitle(sign)
        .setDescription(`<@&${roleId}> ${horoscope}`)
        .setImage(`attachment://${sign}.png`)
        .addFields(
            {
                name: 'Date',
                value: date,
                inline: true,
            }
        );

    return channelRef.send({ embeds: [gameEmbed], files: [zodiacPhoto] });
};
