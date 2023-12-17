
export const PRODUCTS_QUERY = `
    query($limit: Int!, $start: Int!) {
        products(sort: "createdAt:desc", pagination: { limit: $limit, start: $start }) {
            data {
                attributes {
                    empty_visible,
                    name,
                    slug,
                    price,
                    description,
                    sizes,
                    colors,
                    stock,
                    prezzo_senza_sconto,
                    gallery {
                        data {
                            attributes {
                                url
                            }
                        }
                    }                    
                    category {
                        data {
                            attributes {
                                name,
                            }
                        }
                    },
                    subcategory {
                        data {
                            attributes {
                                name,
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
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        },
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
    }
`;

export const FILTER_QUERY = `
    query($search: String) {
        products(sort: "createdAt:desc", pagination: { limit: 100 }, filters: {name: {containsi: $search}}) {
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
                    }
                }
            }
        }
    }
`;

export const NO_QUERY = `
    query($search: String) {
        products(sort: "createdAt:desc", pagination: { limit: 0 }, filters: {name: {containsi: $search}}) {
            data {
                attributes {
                    empty_visible,
                    name,
                    slug,
å                    image {
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
                    stock,
                    prezzo_senza_sconto,
                    gallery {
                        data {
                            attributes {
                                url
                            }
                        }
                    }                   
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
                            }
                        }
                    },
                    subcategory {
                        data {
                            attributes {
                                name,
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
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        },
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
        }
    }
`;

export const HOME_QUERY = `
  query {
    categories: categories(filters: { in_home: { eq: true } }) {
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
    categories2: categories(filters: {
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
    products: products(filters: { in_evidence: { eq: true } }) {
      data {
        attributes {
          empty_visible,
          name,
          slug,
          price,
          description,
          prezzo_senza_sconto,
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    },
    general: general {
      data {
        attributes {
          navbar
          top_bar
          message {
            title
            text
            active
          }
          weight_price
          distance_price
          footer
          spedizione_gratuita
        }
      }
    },
    products2: products(
      pagination: { limit: 4 }
      sort: "createdAt:desc"
    ) {
      data {
        attributes {
          empty_visible,
          name,
          slug,
          prezzo_senza_sconto,
          image {
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
                    stock,
                    prezzo_senza_sconto,
                    gallery {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    colors,
                    category {
                        data {
                            attributes {
                                name,
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
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        },
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
                    stock,
                    prezzo_senza_sconto,
                    gallery {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                    category {
                        data {
                            attributes {
                                name,
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
                }
            }
        },
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        },
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
    }
`;

export const GENERAL_QUERY = `
    query {
        general {
            data {
                attributes {
                    navbar,
                    top_bar,
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        },
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
                    weight_price,
                    distance_price,
                    footer,
                    spedizione_gratuita
                }
            }
        },
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
    }
`;