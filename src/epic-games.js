const mapEpicGameToEmbed = (freeGame) => {
    return {
        title: freeGame.title,
        description: freeGame.description,
        developer: freeGame.seller.name,
        slug: freeGame.catalogNs.mappings.find((om) => om.pageType === 'productHome')?.pageSlug,
        thumbnail: freeGame.keyImages.find((ki) => ki.type === 'OfferImageWide')?.url,
    };
};

export const mapFreeEpicGames = async () => {
    const games = await fetchFreeEpicGames();
    const responseElements = games.data.Catalog.searchStore.elements;
    const freeGames = responseElements.filter((item) => item.price.totalPrice.discountPrice === 0);

    return freeGames.map(mapEpicGameToEmbed);
};

const fetchFreeEpicGames = async () => {
    const url =
        'https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US';

    const response = await fetch(url);

    return await response.json();
};
