import { join } from 'path';

export const buildAndSendMessage = async (client, majorArcana) => {
    const channelRef = await client.channels.fetch(process.env.CHANNEL_ID_TAROT);

    const promises = majorArcana.map((ma) => {
        const cardImgName = `${ma.pull}_${ma.orientation}.png`;
        // const assetPath = join('src', 'necro-hollow', 'tarot-reading', 'assets', cardImgName);
        const assetPath = join('src', 'necro-hollow', 'tarot-reading', 'assets', 'gothic.jpg');

        return channelRef.send({ files: [assetPath] });
    });

    const final = [
        channelRef.send('Daily Tarot Reading:'),
        ...promises,
        channelRef.send('End of Tarot Reading'
    ];

    try {
        await Promise.all(final);
    } catch (e) {
        console.error('ERROR: ', e)
    }
};
