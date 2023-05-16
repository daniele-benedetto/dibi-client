"use client";
import Popup from '../components/Popup/Popup';
import ActionsMenu from '../components/ActionsMenu/ActionsMenu';
import Products from '../components/Products/Products';
import Sidebar from '../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { PRODUCTS_QUERY } from '../lib/query';
import Loader from '../components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { popup } from '../lib/const';

export default function Prodotti() {

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
                return product.attributes.colors.includes(filter.item);
              });
              setData(prod);
            } else if(filter.title === 'Taglia') {
              prod = prod.filter((product) => {
                return product.attributes.sizes.includes(filter.item);
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
      query: PRODUCTS_QUERY
    });

    const { data:prodotti, fetching, error } = results;

    useEffect(() => {
      if(prodotti) {
        setData(prodotti.products.data);
      }
    }, [prodotti]);

    if(fetching) return <Loader />;
    if(error) return router.push('/error');

    return (
        <main className='bg-white p-5'>
          <Popup popup={popup} />
          <ActionsMenu setSortType={setSortType} setSidebarIsOpen={setSidebarIsOpen} sortType={sortType} sidebarIsOpen={sidebarIsOpen} />
          <div className='flex flex-wrap container m-auto'>
            { data && <Sidebar products={prodotti.products.data} filters={filters} setFilters={setFilters} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} resetFilters={resetFilters} /> }
            {!loading && data.length > 0 && <Products products={data} /> }
            {!loading && data.length === 0 && <section className='flex flex-wrap w-full md:w-2/3'>
              <div className='w-full text-center mt-20'>
                <h2 className='text-md'>Nessun prodotto rispecchia i criteri di ricerca</h2>
              </div>
            </section> }
          </div>
        </main>
    );
};
