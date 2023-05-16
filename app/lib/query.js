
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
                    product_variants {
                        data {
                            id,
                            attributes {
                                stock,
                                color,
                                size,
                                gallery {
                                    data {
                                        attributes {
                                            gallery {
                                                data {
                                                    attributes {
                                                        url
                                                    }
                                                }
                                            }
                                        }
                                    }
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
                    materials,
                    weight,
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
                    product_variants {
                        data {
                            id,
                            attributes {
                                stock,
                                color,
                                size,
                                gallery {
                                    data {
                                        attributes {
                                            gallery {
                                                data {
                                                    attributes {
                                                        url
                                                    }
                                                }
                                            }
                                        }
                                    }
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
        }
    }
`;

export const CATEGORIES_QUERY = `
    query {

        categories {
            data {
                attributes {
                    name,
                    slug
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
                    product_variants {
                        data {
                            id,
                            attributes {
                                stock,
                                color,
                                size,
                                gallery {
                                    data {
                                        attributes {
                                            gallery {
                                                data {
                                                    attributes {
                                                        url
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
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
                    product_variants {
                        data {
                            id,
                            attributes {
                                stock,
                                color,
                                size,
                                gallery {
                                    data {
                                        attributes {
                                            gallery {
                                                data {
                                                    attributes {
                                                        url
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;