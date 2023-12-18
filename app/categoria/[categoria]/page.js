"use client";
import Popup from '@/app/components/Popup/Popup';
import ActionsMenu from '@/app/components/ActionsMenu/ActionsMenu';
import Products from '@/app/components/Products/Products';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { PRODUCTS_CATEGORY_QUERY } from '@/app/lib/query';
import Loader from '@/app/components/Loader/Loader';
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';

const PAGE_SIZE = 9;

export default function Prodotti({ params }) {

    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState("createdAt:desc");
    const [rangeValue, setRangeValue] = useState(0);
    const [value , setValue] = useState(0);
    const [rangeMax, setRangeMax] = useState(0);
    const [filters, setFilters] = useState([]);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [firstAccess, setFirstAccess] = useState(true);
    const [total, setTotal] = useState(0);


    const resetFilters = () => {
      setSortType("createdAt:desc");
      setFilters([]);
    };

    const [results] = useQuery({
      query: PRODUCTS_CATEGORY_QUERY,
      variables: {
        slug: params.categoria,
        limit: PAGE_SIZE + 1,
        start: (page - 1) * PAGE_SIZE,
        subcategory: filters.find((filter) => {
          return filter.title === 'Sottocategoria';
        })?.item,
        sort: sortType,
        rangeMax: value,
      },
    });

    const { data:prodotti, fetching, error } = results;

    useEffect(() => {
      if(prodotti) {
        setData(prodotti.products.data.slice(0, PAGE_SIZE));
        setFirstAccess(false);
        setTotal(prodotti.products.meta.pagination.total);
        setRangeMax(prodotti.highestPrice?.data[0]?.attributes?.price ? prodotti.highestPrice.data[0].attributes.price : 0);
      }
    }, [prodotti]);

    useEffect(() => {
      setRangeValue(rangeMax);
    }, [rangeMax]);

    useEffect(() => {

    }, [rangeValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setValue(rangeValue);
        setPage(1);
      }, 500);

      return () => clearTimeout(timeout);
  }, [rangeValue]);


    useEffect(() => {
      setPage(1);
    }, [filters, sortType]);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [page]);

    if(fetching && firstAccess) return <Loader />;
    if(error) return <p>Errore...</p>

    return (
      <>
        {prodotti?.general?.data.attributes.top_bar && <Topbar topbar={prodotti.general.data.attributes.top_bar} />}
        {prodotti?.general?.data.attributes.navbar && <Navbar navbar={prodotti.general.data.attributes.navbar} categories={prodotti.categories.data} />}
        <main className='bg-white p-5'>
          {prodotti?.general?.data.attributes.popup && <Popup popup={prodotti.general.data.attributes.popup} />}
          <ActionsMenu setSortType={setSortType} setSidebarIsOpen={setSidebarIsOpen} sortType={sortType} sidebarIsOpen={sidebarIsOpen} />
          <div className='flex flex-wrap container m-auto'>
            { data && prodotti && <Sidebar filters={filters} setFilters={setFilters} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} resetFilters={resetFilters} categories={prodotti.categories2.data} subcategories={prodotti.subcategories.data} rangeValue={rangeValue} setRangeValue={setRangeValue} rangeMin={0} rangeMax={rangeMax} /> }
            {data.length > 0 && <Products products={data} />}
            {data.length === 0 && <section className='flex w-full md:w-2/3 justify-center'>
              <p className='text-center'>Nessun prodotto rispecchia i criteri di ricerca</p>
            </section>}
            {data.length > 0 && (
              <section className='flex w-full justify-center md:justify-end m-auto'>
                <div className='flex flex-wrap md:w-2/3 justify-center'>
                {page !== 1 && (
                  <button
                    className={`bg-white border border-gray-300 text-gray-500  px-4 py-2 rounded-l ${page === 1 ? 'background-second-color text-white' : ''}`}
                    onClick={() => setPage(1)}
                  >
                    1
                  </button>
                )}
                {page > 2 && (
                  <button className='bg-white border border-gray-300 text-gray-500  px-4 py-2'>
                    ...
                  </button>
                )}
                {page > 2 && (
                  <button
                    className={`bg-white border border-gray-300 text-gray-500  px-4 py-2 ${page === page - 1 ? 'background-second-color text-white' : ''}`}
                    onClick={() => setPage(page - 1)}
                  >
                    {page - 1}
                  </button>
                )}
                <button
                  className={`bg-white border border-gray-300 text-gray-500  px-4 py-2 ${page === page ? 'background-second-color text-white' : ''}`}
                  onClick={() => setPage(page)}
                >
                  {page}
                </button>
                { ((total / PAGE_SIZE).toFixed(0) > page && page < (total / PAGE_SIZE).toFixed(0) - 1) && <button
                  className={`bg-white border border-gray-300 text-gray-500  px-4 py-2 ${page === page + 1 ? 'background-second-color text-white' : ''}`}
                  onClick={() => setPage(page + 1)}
                >
                  {page + 1}
                </button> }
                {((total / PAGE_SIZE).toFixed(0) > page) && (page < (total / PAGE_SIZE).toFixed(0) - 1) && (
                  <button className='bg-white border border-gray-300 text-gray-500 px-4 py-2'>
                    ...
                  </button>
                )}
                {((total / PAGE_SIZE).toFixed(0) > page) && (page < (total / PAGE_SIZE).toFixed(0)) && (
                  <button
                    className={`bg-white border border-gray-300 text-gray-500 px-4 py-2 rounded-r ${page === (total / PAGE_SIZE).toFixed(0) ? 'background-second-color text-white' : ''}`}
                    onClick={() => setPage((total / PAGE_SIZE).toFixed(0))}
                  >
                    {(total / PAGE_SIZE).toFixed(0)}
                  </button>
                )}
                </div>
              </section>
            )}
          </div>
        </main>
        {prodotti?.general?.data.attributes.footer && <Footer footerServizioClienti={prodotti.general.data.attributes.footer.footerServizioClienti} footerAbout={prodotti.general.data.attributes.footer.footerAbout} footerSocial={prodotti.general.data.attributes.footer.footerSocial} />}
      </>
    );
};
