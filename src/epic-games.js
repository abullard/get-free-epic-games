export const mapFreeEpicGames = async () => {
    const games = await fetchFreeEpicGames();
    const responseElements = games.data.Catalog.searchStore.elements;

    const freeGames = responseElements.filter((item) => item.price.totalPrice.discountPrice === 0);

    return freeGames.map((fg) => {
        return {
            title: fg.title,
            description: fg.description,
            status: fg.status,
            developer: fg.seller.name,
            slug: fg.catalogNs.mappings.find((om) => om.pageType === 'productHome')?.pageSlug,
            thumbnail: fg.keyImages.find((ki) => ki.type === 'OfferImageWide')?.url,
        };
    });
};

const fetchFreeEpicGames = async () => {
    const url =
        'https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US';

    const response = await fetch(url);

    return await response.json();
};
