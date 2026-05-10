import * as cheerio from 'cheerio';
import { necroHollowZodiacChannelMap } from './data.js';

export const scrapeHoroscope = async () => {
    const dailyHoroscopes = [];

    for (const sign of Object.keys(necroHollowZodiacChannelMap)) {
        const signData = necroHollowZodiacChannelMap[sign];
        const url = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign=${signData.queryParamNumber}`;
        const html = await (await fetch(url)).text();

        dailyHoroscopes.push({
            date: new Date().toLocaleDateString(),
            sign,
            horoscope: parsePageContents(html),
        });
    }

    return dailyHoroscopes;
};

const parsePageContents = (html) => {
    const $ = cheerio.load(html);

    // select <div class=main-horoscope><p> tags, get the first element from the DOM
    const val = $('.main-horoscope p').first().text();
    
    // split by '-' to single out the date, slice the date out of the array 
    const removedFirst = val.split('-').slice(1);

    // rejoin the array (minus the date) && trim whitespace
    return removedFirst.join('-').trim();
};
