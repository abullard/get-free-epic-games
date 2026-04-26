export const getHoroscopes = async () => {
    const dailyHoroscopeRequets = [];
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

    for (const sign of signs) {
        const url = `https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`;

        dailyHoroscopeRequets.push((await fetch(url)).json());
    }

    return await Promise.all(dailyHoroscopeRequets);
}
