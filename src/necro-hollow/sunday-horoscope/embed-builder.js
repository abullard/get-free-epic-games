import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { necroHollowZodiacChannelMap } from './data.js';
import { join } from 'path';

export const buildAndSendEmbeds = async (client, horoscopes) => {
    const horoscopeAndChannel = horoscopes.map(async (h) => {
        const zodiac = necroHollowZodiacChannelMap[h.sign];
        const roleId = zodiac.roleId;
        const channelId = zodiac.channelId;
        const channelRef = await client.channels.fetch(channelId);
        const image = join('src', 'necro-hollow', 'sunday-horoscope', 'assets', h.sign) + '.png';

        return {
            ...h,
            roleId, 
            channelRef,
            image
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
    const {sign, date, horoscope, roleId, channelRef, image, } = await horoscopeAndChannel;
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
