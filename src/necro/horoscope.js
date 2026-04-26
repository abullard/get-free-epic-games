import ky from "ky";

export const getHoroscopes = async () => {
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    const dailyHoroscopeRequets = [];

    for (const sign of signs) {
        dailyHoroscopeRequets.push(ky.get(`https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`).json());
    }

    return await Promise.all(dailyHoroscopeRequets);
}
