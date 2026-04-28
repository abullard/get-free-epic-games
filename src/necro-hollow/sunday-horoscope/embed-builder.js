import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { necroHollowZodiacChannelMap } from 'data.js';
import { join } from 'path';

export const buildAndSendEmbeds = async (client, horoscopes) => {
    const horoscopeAndChannel = horoscopes.map(async (h) => {
        const channelId = necroHollowZodiacChannelMap[h.sign];
        const channelRef = await client.channels.fetch(channelId);
        const image = join('src', 'necro-hollow', 'sunday-horoscope', 'assets', h.sign) + '.jpg';

        return {
            ...h,
            image,
            channelRef,
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
    const {sign, date, horoscope, channelRef, image} = await horoscopeAndChannel;
    const zodiacPhoto = new AttachmentBuilder(image);

    // TODO: add mention of role, need to put ROLE_IDs in secrets

    // add photo?
    const gameEmbed = new EmbedBuilder()
        .setColor(0xDAB5F8)
        .setTitle(sign)
        .setDescription(`<@&${'1496981510367088762'}> ${horoscope}`)
        .setImage(`attachment://${sign}.jpg`)
        .addFields(
            {
                name: 'Date',
                value: date,
                inline: true,
            }
        );

    return channelRef.send({ embeds: [gameEmbed], files: [zodiacPhoto] });
};
