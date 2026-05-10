import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { necroHollowZodiacChannelMap } from './types.js';
import { join } from 'path';

export const buildAndSendEmbeds = async (client, horoscopes) => {
    const horoscopeAndChannel = horoscopes.map(async (h) => {
        const zodiac = h.sign;
        console.log('AJB: zodiac.toUpperCase(): ', zodiac.toUpperCase());
        const channelId = String(process.env[`CHANNEL_ID_${zodiac.toUpperCase()}`]).trim();

        return {
            ...h,
            roleId: process.env[`ROLE_ID_${zodiac.toUpperCase()}`],
            channelRef: await client.channels.fetch(channelId),
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

    console.log('AJB: buildGameEmbeds sign: ', sign);

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
