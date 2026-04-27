import { EmbedBuilder } from 'discord.js';

const necroHollowZodiacChannelMap = {
    'Aries': process.env.CHANNEL_ID_ARIES,
    'Taurus': process.env.CHANNEL_ID_TAURUS,
    'Gemini': process.env.CHANNEL_ID_GEMINI,
    'Cancer': process.env.CHANNEL_ID_CANCER,
    'Leo': process.env.CHANNEL_ID_LEO,
    'Virgo': process.env.CHANNEL_ID_VIRGO,
    'Libra': process.env.CHANNEL_ID_LIBRA,
    'Scorpio': process.env.CHANNEL_ID_SCORPIO,
    'Sagittarius': process.env.CHANNEL_ID_SAGITTARIUS,
    'Capricorn': process.env.CHANNEL_ID_CAPRICORN,
    'Aquarius': process.env.CHANNEL_ID_AQUARIUS,
    'Pisces': process.env.CHANNEL_ID_PISCES,
};

export const buildAndSendEmbeds = async (client, horoscopes) => {
    const horoscopeAndChannel = horoscopes.map(async (h) => {
        const channelId = necroHollowZodiacChannelMap[h.sign];
        const channelRef = await client.channels.fetch(channelId);
        
        return {
            ...h,
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
    const {sign, date, horoscope, channelRef} = await horoscopeAndChannel;

    // TODO: add mention of role, need to put ROLE_IDs in secrets
    // add photo?
    const gameEmbed = new EmbedBuilder()
        .setColor(0xDAB5F8)
        .setTitle(sign)
        .setDescription(`<@&${'1496981510367088762'}> ${horoscope}`)
        .setImage(horoscopeAndChannel.thumbnail)
        .addFields(
            {
                name: 'date',
                value: date,
                inline: true,
            }
        );

    return channelRef.send({ embeds: [gameEmbed] });
};
