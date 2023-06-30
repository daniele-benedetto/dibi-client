
export const PRODUCTS_QUERY = `
    query {
        products {
            data {
                attributes {
                    empty_visible,
                    name,
                    slug,
                    price,
                    description,
                    sizes,
                    colors,
                    materials,
                    category {
                        data {
                            attributes {
                                name,
                                sale {
                                    data {
                                        attributes {
                                            name,
                                            amount,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    subcategory {
                        data {
                            attributes {
                                name,
                                sale {
                                    data {
                                        attributes {
                                            name,
                                            amount,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                    product_variant {
                        id,
                        color,
                        size,
                        stock,
                        gallery {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    },
                    sale {
                        data {
                            attributes {
                                name,
                                amount,
                            }
                        }
                    }
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;

export const PRODUCT_QUERY = `
    query getProduct($slug: String!) {
        products(filters: {
            slug: {
                eq: $slug
            }
        }) {
            data{
                id,
                attributes {
                    empty_visible,
                    name,
                    slug,
                    price,
                    description,
                    sizes,
                    colors,
                    weight,
                    modello,
                    marchio,
                    genere,
                    confezione_originale,
                    condizioni,
                    funzionante,
                    category {
                        data {
                            attributes {
                                name,
                                sale {
                                    data {
                                        attributes {
                                            name,
                                            amount,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    subcategory {
                        data {
                            attributes {
                                name,
                                sale {
                                    data {
                                        attributes {
                                            name,
                                            amount,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    image{
                        data{
                            attributes{
                                url
                            }
                        }
                    },
                    product_variant {
                        id,
                        color,
                        size,
                        stock,
                        gallery {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    },
                    sale {
                        data {
                            attributes {
                                name,
                                amount,
                            }
                        }
                    }
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;

export const CATEGORIES_QUERY = `
    query {
        categories(filters: {
            in_evidence: {
                eq: true
            }
        }) {
            data {
                attributes {
                    name,
                    slug,
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                    subcategories {
                        data {
                            attributes {
                                name,
                                slug
                            }
                        }
                    }
                }
            }
        },
        
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;


export const HOME_QUERY = `
    query {
        products(filters: {
            in_evidence: {
                eq: true
            }
        }) {
            data {
                attributes {
                    empty_visible,
                    name,
                    slug,
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;

export const HOME_2_QUERY = `
    query {
        products(pagination: {
            limit: 4
        }) {
            data {
                attributes {
                    empty_visible,
                    name,
                    slug,
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;



export const PRODUCTS_CATEGORY_QUERY = `
query getProductCategory($slug: String!) {
    products(filters: {
        category: {
            slug: {
                eq: $slug
            }
        }
    }) {       
            data {
                attributes {
                    empty_visible,
                    name,
                    slug,
                    price,
                    description,
                    sizes,
                    colors,
                    materials,
                    category {
                        data {
                            attributes {
                                name,
                                sale {
                                    data {
                                        attributes {
                                            name,
                                            amount,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    subcategory {
                        data {
                            attributes {
                                name
                            }
                        }
                    },
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                    product_variant {
                        id,
                        color,
                        size,
                        stock,
                        gallery {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    },
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;

export const PRODUCTS_SUBCATEGORY_QUERY = `
query getProductCategory($slug: String!) {
    products(filters: {
        subcategory: {
            slug: {
                eq: $slug
            }
        }
    }) {       
            data {
                attributes {
                    empty_visible,
                    name,
                    slug,
                    price,
                    description,
                    sizes,
                    colors,
                    materials,
                    category {
                        data {
                            attributes {
                                name,
                                sale {
                                    data {
                                        attributes {
                                            name,
                                            amount,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    subcategory {
                        data {
                            attributes {
                                name
                            }
                        }
                    },
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                    product_variant {
                        id,
                        color,
                        size,
                        stock,
                        gallery {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    },
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;

export const GENERAL_QUERY = `
    query {
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;


export const PAGE_QUERY = `
    query getPage($slug: String!) {
        pages(filters: {
            slug: {
                eq: $slug
            }
        }) {
            data {
                attributes {
                    title,
                    subtitle
                    slug,
                    content,
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                    contact_form,
                    faq {
                        title,
                        content
                    }
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    pop_up {
                        title,
                        time,
                        text
                    },
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        }
    }
`;