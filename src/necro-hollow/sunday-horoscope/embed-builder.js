import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { necroHollowZodiacChannelMap } from './types.js';
import { join } from 'path';

export const buildAndSendEmbeds = async (client, horoscopes) => {
    const horoscopeAndChannel = horoscopes.map(async (h) => {
        const zodiac = h.sign;
        const channelId = String(process.env[`CHANNEL_ID_${zodiac.toUpperCase()}`]).trim();

        console.log('AJB: zodiac: ', zodiac);
        console.log('AJB: typeof channelId: ', typeof channelId);

        return {
            ...h,
            roleId: process.env[`ROLE_ID_${zodiac.toUpperCase()}`],
            channelRef: await client.channels.fetch(process.env[`CHANNEL_ID_${zodiac.toUpperCase()}`]),
            image: join('src', 'necro-hollow', 'sunday-horoscope', 'assets', zodiac) + '.png'
        }
    });

    const promises = horoscopeAndChannel.map(async (hac) => await buildGameEmbeds(hac));

    try {
        await Promise.all(promises);
    } catch (e) {
        console.error('ERROR: ', e)
    }
};

const buildGameEmbeds = async (horoscopeAndChannel) => {
    const { sign, date, horoscope, roleId, channelRef, image } = await horoscopeAndChannel;
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
