"use client";
import Popup from '@/app/components/Popup/Popup';
import ActionsMenu from '@/app/components/ActionsMenu/ActionsMenu';
import Products from '@/app/components/Products/Products';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { PRODUCTS_CATEGORY_QUERY } from '@/app/lib/query';
import Loader from '@/app/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Error from 'next/error';

export default function ProdottiCategoria({params}) {

    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('');
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const router = useRouter();

    const resetFilters = () => {
      setData(prodotti.products.data);
      setFilters([]);
      setSortType('');
    };

    useEffect(() => {
      setLoading(true);
      const sortArray = type => {
        const types = {
          price: 'price',
          name: 'name'
        };
        if(type[0] === 'price' && type[1] === 'desc') {
          const sortProperty = types[type[0]];
          const sorted = [...data].sort((a, b) => b.attributes[sortProperty] - a.attributes[sortProperty]);
          setData(sorted);
        } else if(type[0] === 'price' && type[1] === 'asc') {
          const sortProperty = types[type[0]];
          const sorted = [...data].sort((a, b) => a.attributes[sortProperty] - b.attributes[sortProperty]);
          setData(sorted);
        } else if(type[0] === 'name' && type[1] === 'desc') {
          const sortProperty = types[type[0]];
          const sorted = [...data].sort((a, b) => b.attributes[sortProperty] > a.attributes[sortProperty] ? 1 : -1);
          setData(sorted);
        } else if(type[0] === 'name' && type[1] === 'asc') {
          const sortProperty = types[type[0]];
          const sorted = [...data].sort((a, b) => a.attributes[sortProperty] > b.attributes[sortProperty] ? 1 : -1);
          setData(sorted);
        }
      };  
      sortArray(sortType);
      setLoading(false);
    }, [sortType]);

    useEffect(() => {
      setLoading(true);
      const filterData = () => {
        if(filters.length > 0) {
          let prod = [...prodotti.products.data];
          filters.map((filter) => {
            if(filter.title === 'Categoria') {
              prod = prod.filter((product) => {
                return product.attributes.category.data.attributes.name === filter.item;
              });
              setData(prod);
            } else if(filter.title === 'Sottocategoria') {
              prod = prod.filter((product) => {
                return product.attributes.subcategory.data.attributes.name === filter.item;
              });
              setData(prod);
            } else if(filter.title === 'Colore') {
              prod = prod.filter((product) => {
                return product.attributes.colors === filter.item;
              });
              setData(prod);
            } else if(filter.title === 'Taglia') {
              prod = prod.filter((product) => {
                return product.attributes.sizes === filter.item;
              });
              setData(prod);
            } else if(filter.title === 'Prezzo') {
              prod = prod.filter((product) => {
                return product.attributes.price <= filter.item;
              });
              setData(prod);
            }
          });
        } else if(data.length === 0 && filters.length > 0) {
          setData([]);
        }
      }
  
      filterData();
      setLoading(false);
    }, [filters]); 

    const [results] = useQuery({
      query: PRODUCTS_CATEGORY_QUERY,
        variables: {
            slug: params.categoria
        },
    });

    const { data:prodotti, fetching, error } = results;


    useEffect(() => {
      if(prodotti) {
        setData(prodotti.products.data);
      }
    }, [prodotti]);

    if(fetching) return <Loader />;
    if(error) return Error();

    return (
      <>
        {prodotti?.general?.data.attributes.top_bar && <Topbar topbar={prodotti.general.data.attributes.top_bar} />}
        {prodotti?.general?.data.attributes.navbar && <Navbar navbar={prodotti.general.data.attributes.navbar} categories={prodotti.categories.data} /> }
        <main className='bg-white p-5'>
          {prodotti?.general?.data.attributes.popup && <Popup popup={prodotti.general.data.attributes.popup} />}
          <ActionsMenu setSortType={setSortType} setSidebarIsOpen={setSidebarIsOpen} sortType={sortType} sidebarIsOpen={sidebarIsOpen} />
          <div className='flex flex-wrap container m-auto'>
            { data && <Sidebar products={prodotti.products.data} filters={filters} setFilters={setFilters} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} resetFilters={resetFilters} /> }
            {!loading && data.length > 0 && <Products products={data} />}
            {!loading && data.length === 0 && <section className='flex flex-wrap w-full md:w-2/3'>
              <div className='w-full text-center mt-20'>
                <h2 className='text-md'>Nessun prodotto rispecchia i criteri di ricerca</h2>
              </div>
            </section> }
          </div>
        </main>
        {prodotti?.general?.data.attributes.footer && <Footer footerServizioClienti={prodotti.general.data.attributes.footer.footerServizioClienti} footerAbout={prodotti.general.data.attributes.footer.footerAbout} footerSocial={prodotti.general.data.attributes.footer.footerSocial} />}
      </>
    );
};
