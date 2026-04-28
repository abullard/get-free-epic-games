import { getHoroscopes } from './horoscope.js';
import { buildAndSendEmbeds } from './embed-builder.js';

export const readyHandler = async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    // const result = await getHoroscopes();

    // TODO: keep this around for testing purposes
    const result = [
        {
            date: '2026-04-26',
            sign: 'Aries',
            horoscope: "Today, Aries, you might encounter an unusual individual claiming to possess mind-reading abilities. However, don't be fooled; this person is likely more confused than insightful. It's wise to approach their forecasts with skepticism—better yet, keep a healthy distance from them. The likelihood is that their predictions are far from accurate. Rely on your own instincts instead; your intuition is much more reliable than the musings of this self-proclaimed psychic."
        },
        // {
        //     date: '2026-04-26',
        //     sign: 'Taurus',
        //     horoscope: "At this moment, Taurus, your financial aspirations may feel a bit unclear and ambiguous. You might find yourself at a pivotal point regarding your income, unsure of the best path to take. Alternatively, if you're considering making some purchases, you may struggle to prioritize what's truly essential. Today isn't the best time to make any financial decisions; it's wise to hold off for a day or two."
        // },
        // {
        //     date: '2026-04-26',
        //     sign: 'Gemini',
        //     horoscope: "Today, Gemini, you might find yourself questioning the intentions of a coworker. Their agenda appears to be self-serving, potentially disregarding the feelings and needs of others who might obstruct their path. It's wise to be cautious and not overlook any red flags in their behavior. The most prudent approach is to keep your distance and prioritize your own well-being."
        // },
        // {
        //     date: '2026-04-26',
        //     sign: 'Cancer',
        //     horoscope: "Today, Cancer, you might find yourself questioning some spiritual beliefs that you've held dear for quite a while. Don't let this uncertainty lead to a crisis; it's likely just a natural phase of your personal development. Take some time to revisit the classic texts that initially inspired you, and explore some new literature as well. By examining these ideas through the lens of your current understanding, you may discover that your doubts are not as significant as they seem."
        // },
        // {
        //     date: '2026-04-26',
        //     sign: 'Leo',
        //     horoscope: "You might find yourself grappling with unsettling dreams that raise questions about a friend’s intentions, Leo. Their recent odd behavior could leave you pondering the stability of your friendship. Take a moment to reflect on the symbols within your dreams; they could be revealing insights about either you, your friend, or perhaps both. It's worth considering!"
        // },
        // {
        //     date: '2026-04-26',
        //     sign: 'Virgo',
        //     horoscope: 'Virgo, you may find yourself amidst some sneaky and questionable activities at your job. This could leave you feeling upset and anxious about your position. It might also prompt you to reflect on whether this is the right environment for you. These internal struggles are a signal for you to confront the situation head-on and clarify your true aspirations. Once you have that clarity, take decisive action towards your goals.'
        // },
        // {
        //     date: '2026-04-26',
        //     sign: 'Libra',
        //     horoscope: "Libra, today you may find yourself feeling a bit off-kilter, and your ability to concentrate might wane. You could struggle to stay focused on your tasks. There's no need to fret; this is more of a mental phase that will soon fade. You might be tempted to rely on coffee throughout the day to keep your energy up. However, it’s wise to practice moderation, as too much caffeine could backfire. Just hang in there!"
        // },
        // {
        //     date: '2026-04-26',
        //     sign: 'Scorpio',
        //     horoscope: "Today, Scorpio, you may find yourself grappling with doubts and insecurities in your romantic life. Are you and your partner on the same wavelength? Can you trust your friend's sincerity? What lies ahead for this relationship? The key to overcoming this emotional turbulence is to proceed gradually, carefully assessing the outcomes of each move you make. By doing so, you'll be able to clarify your uncertainties and find the answers you seek."
        // },
        // {
        //     date: '2026-04-26',
        //     sign: 'Sagittarius',
        //     horoscope: "Someone in your home may be facing challenges, Sagittarius, leading them to rely heavily on your emotional and moral backing. While it's nice to be needed, this could also take a toll on your own energy. Take a moment to reflect on what you truly want to communicate to your friend. At times, delivering a dose of honesty—figuratively speaking—can be the wake-up call they need."
        // },
        // {
        //     date: '2026-04-26',
        //     sign: 'Capricorn',
        //     horoscope: "Today, Capricorn, you might encounter some outrageous rumors that are far from the truth. Upon reflection, you'll realize how illogical and absurd they truly are. Yet, the individual sharing this information may be so charismatic and convincing that you could find yourself momentarily swayed. It's essential to verify the facts in these instances. By doing so, you'll remain anchored in reality and avoid getting swept away by fanciful tales."
        // },
        {
            date: '2026-04-26',
            sign: 'Aquarius',
            horoscope: 'Aquarius, today you might find yourself drawn to tackle your financial matters—settling bills, making deposits, and mapping out next month’s budget. However, your enthusiasm may be lacking. Your thoughts are likely wandering towards more captivating endeavors. Pushing yourself to focus on finances could lead to frustration and distraction, making it feel like a futile effort. Consider holding off for a few days; you’ll likely feel more grounded and ready to handle these tasks then.'
        },
        // {
        //     date: '2026-04-26',
        //     sign: 'Pisces',
        //     horoscope: 'Typically, Pisces, you possess strong focus and concentration skills. However, today you may notice a dip in these abilities. You might struggle with your tasks and find yourself reflecting on past disappointments. It could be beneficial to pause and explore why these memories are surfacing at this time. Letting go of them could help restore your concentration to its usual level.'
        // },
    ];

    await buildAndSendEmbeds(readyClient, result);

    process.exit(0);
};
