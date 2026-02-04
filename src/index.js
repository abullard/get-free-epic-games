import { loginWithDiscord, sendMessage } from "./discord-client.js";

const run = async () => {
    const client = loginWithDiscord();
};

run();
