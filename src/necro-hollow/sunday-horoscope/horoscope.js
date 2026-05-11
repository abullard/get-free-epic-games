import * as cheerio from 'cheerio';

export const scrapeHoroscope = async () => {
    const dailyHoroscopes = [];
    const signs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius',
        'Pisces',
    ];

    for (const sign of signs) {
        const url = `https://www.astroyogi.com/horoscopes/daily/${sign}-free-horoscope.aspx`;
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
    const selector = cheerio.load(html);

    const reading = parseReading(selector);
    const metadata = parseMetadata(selector);

    return {
        reading, 
        metadata
    };
};

// pls don't look at this function, it's brittle
const parseReading = (selector) => {
    const reading = selector('.content-page p').first().text().trim(); // select <div class="content-page"><p> tags, get the first element from the DOM
    const splitReading = reading.split('.');
    splitReading.splice(-1, 1); // remove empty line
    const splitReadingWithApostrophes = splitReading.map(sr => sr.replaceAll('\x92', "'")); // add apostrophes back in bcuz this website is weird
    const last = splitReadingWithApostrophes.splice(-1, 1); // select last line missing space

    return splitReadingWithApostrophes.join('.').concat(`. ${last[0]}`);
};

// pls also don't look at this function, it's brittle too
const parseMetadata = (selector) => {
    const metaData = {};

    const table = selector('.bill_table');
    table.find('tr').each((i, row) => {
        const rowData = [];

        selector(row).find('td').each((j, cell) => {
            rowData.push(selector(cell).text());
        });

        metaData[rowData[0].toString()] = rowData[1];
    });

    return metaData;
};
