export default function sitemap() {
    const url = "https://www.cianfrusalia.it/";
    return [
        {
            url: url,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: url + 'prodotti',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: url + 'chi-sono',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.cianfrusalia.it/contatti',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: 'https://www.cianfrusalia.it/privacy-policy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: 'https://www.cianfrusalia.it/contatti',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        }
    ];
};