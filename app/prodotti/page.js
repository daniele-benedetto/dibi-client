"use client";
import Popup from '@/app/components/Popup/Popup';
import ActionsMenu from '@/app/components/ActionsMenu/ActionsMenu';
import Products from '@/app/components/Products/Products';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { PRODUCTS_QUERY } from '@/app/lib/query';
import Loader from '@/app/components/Loader/Loader';
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';

const PAGE_SIZE = 9;

export default function Prodotti() {

    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('');
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [firstAccess, setFirstAccess] = useState(true);


    const resetFilters = () => {
      setData(prodotti.products.data);
      setFilters([]);
      setSortType('');
    };

    const handleInfiniteScroll = () => {
      if (!fetching && hasMore) {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 200
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    
    useEffect(() => {
      window.addEventListener('scroll', handleInfiniteScroll);
      return () => {
        window.removeEventListener('scroll', handleInfiniteScroll);
      };
    }, [handleInfiniteScroll]);

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
      query: PRODUCTS_QUERY,
      variables: {
        limit: PAGE_SIZE + 1,
        start: (page - 1) * PAGE_SIZE,
      },
    });

    const { data:prodotti, fetching, error } = results;

    useEffect(() => {
      if(prodotti) {
        setHasMore(prodotti.products.data.length === PAGE_SIZE + 1);
        setData((prevData) => [...prevData, ...prodotti.products.data.slice(0, PAGE_SIZE)]);
        setFirstAccess(false);
      }
    }, [prodotti]);

    if(fetching && firstAccess) return <Loader />;
    if(error) return <p>Errore...</p>

    return (
      <>
        {prodotti?.general?.data.attributes.top_bar && <Topbar topbar={prodotti.general.data.attributes.top_bar} />}
        {prodotti?.general?.data.attributes.navbar && <Navbar navbar={prodotti.general.data.attributes.navbar} categories={prodotti.categories.data} />}
        <main className='bg-white p-5'>
          {prodotti?.general?.data.attributes.popup && <Popup popup={prodotti.general.data.attributes.popup} />}
          <div className='flex flex-wrap container m-auto'>
            { data && prodotti && <Sidebar products={prodotti.products.data} filters={filters} setFilters={setFilters} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} resetFilters={resetFilters} /> }
            {!loading && data.length > 0 && <Products products={data} />}
            { fetching && !firstAccess && <section className='flex flex-wrap w-full relative h-12'>
              <svg className='absolute left-2/3 -translate-x-1/2' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g transform="rotate(180 12 12)"><path fill="#f7812a" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
            </section> }
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
