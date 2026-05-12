import { join } from 'path';

export const buildAndSendMessage = async (client, majorArcana) => {
    const channelRef = await client.channels.fetch(process.env.CHANNEL_ID_TAROT);

    try {
        await sendHeaderThenCard(channelRef, majorArcana.first, 'past.png');
        await sendHeaderThenCard(channelRef, majorArcana.second, 'present.png');
        await sendHeaderThenCard(channelRef, majorArcana.third, 'future.png');
    } catch (e) {
        console.error('ERROR: ', e)
    }
};

const sendHeaderThenCard = async (channelRef, card, header) => {
    const cardImgName = `${card.pull}_${card.orientation}.png`;
    const assetPath = join('src', 'necro-hollow', 'tarot-reading', 'assets');
    const headerPath = join(assetPath, 'headers', header);
    const cardPath = join(assetPath, cardImgName);
    
    await channelRef.send({ files: [headerPath] });
    await channelRef.send({ files: [cardPath] });
};
