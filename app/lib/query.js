
export const PRODUCTS_QUERY = `
    query {
        products (sort: "createdAt:desc", pagination: { limit: 1000 }) {
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
          name
          slug
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
          empty_visible
          name
          slug
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
          empty_visible
          name
          slug
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