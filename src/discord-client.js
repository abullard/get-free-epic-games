import { Client, Events, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { mapFreeEpicGames } from "./epic-games.js";

export const loginWithDiscord = () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.once(Events.ClientReady, async (readyClient) => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
        // AJB TODO - extract main here
        const result = await mapFreeEpicGames();

        // await sendMessage(client, result);
    });

    client.login(process.env.DISCORD_TOKEN);

    return client;
};

export const sendMessage = async (client, freeGames) => {
    const channel = await client.channels.fetch("1468456945529917564");

    freeGames.map((fg) => {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x5bbb56)
            .setTitle(`${fg.title} is Free on Epic Games!`)
            .setURL(`https://store.epicgames.com/en-US/p/${fg.slug}`)
            .setDescription(fg.description)
            .setImage(fg.thumbnail)
            .addFields({
                name: "Cost",
                value: "$0.00",
                inline: true,
            })
            .addFields({
                name: "Developer",
                value: fg.developer,
                inline: true,
            })
            .addFields({
                name: "Status",
                value: fg.status,
                inline: true,
            });

        channel.send({ embeds: [exampleEmbed] });
    });
};
