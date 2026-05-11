import { join } from 'path';

export const buildAndSendMessage = async (client, majorArcana) => {
    const channelRef = await client.channels.fetch(process.env.CHANNEL_ID_TAROT);

    const promises = majorArcana.map((ma) => {
        const cardImgName = `${ma.pull}_${ma.orientation}.png`;
        const assetPath = join('src', 'necro-hollow', 'tarot-reading', 'assets', cardImgName);

        return channelRef.send({ files: [assetPath] });
    });

    try {
        await Promise.all(promises);
    } catch (e) {
        console.error('ERROR: ', e)
    }
};
