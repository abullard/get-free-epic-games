const random = (max) => {
    return Math.floor(Math.random() * max);
};

const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    return arr;
};

const getOrientation = () => {
    return random(2) === 0 ? 'up' : 'down';
};

export const pullThreeMajorArcana = () => {
    const majorArcana = [
        'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
        'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
        'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
        'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
        'Judgement', 'The World',
    ];

    const firstRandom = random(majorArcana.length - 1);
    const firstAtZeroth = swap(majorArcana, 0, firstRandom);
    const firstPull = firstAtZeroth.shift();

    const secondRandom = random(majorArcana.length - 1);
    const secondAtZeroth = swap(majorArcana, 0, secondRandom);
    const secondPull = secondAtZeroth.shift();

    const thirdRandom = random(majorArcana.length - 1);
    const thirdAtZeroth = swap(majorArcana, 0, thirdRandom);
    const thirdPull = thirdAtZeroth.shift();

    return [
        {
            orientation: getOrientation(),
            pull: firstPull,
        },
        {
            orientation: getOrientation(),
            pull: secondPull,
        },
        {
            orientation: getOrientation(),
            pull: thirdPull
        }
    ];
};

pullThreeMajorArcana();






















