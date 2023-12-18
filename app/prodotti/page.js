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
    const [sortType, setSortType] = useState(null);
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [firstAccess, setFirstAccess] = useState(true);
    const [total, setTotal] = useState(0);


    const resetFilters = () => {
      setSortType(null);
      setFilters([]);
    };

    const [results] = useQuery({
      query: PRODUCTS_QUERY,
      variables: {
        limit: PAGE_SIZE + 1,
        start: (page - 1) * PAGE_SIZE,
        category: filters.find((filter) => {
          return filter.title === 'Categoria';
        })?.item,
        subcategory: filters.find((filter) => {
          return filter.title === 'Sottocategoria';
        })?.item,
      },
    });

    const { data:prodotti, fetching, error } = results;

    useEffect(() => {
      if(prodotti) {
        setData(prodotti.products.data.slice(0, PAGE_SIZE));
        setFirstAccess(false);
        setTotal(prodotti.products.meta.pagination.total);
      }
    }, [prodotti]);

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
            { data && prodotti && <Sidebar filters={filters} setFilters={setFilters} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} resetFilters={resetFilters} categories={prodotti.categories2.data} subcategories={prodotti.subcategories.data} /> }
            {!loading && data.length > 0 && <Products products={data} />}
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
            { fetching && !firstAccess && <section className='flex flex-wrap w-full relative h-12'>
              <svg className='absolute left-2/3 -translate-x-1/2' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g transform="rotate(180 12 12)"><path fill="#f7812a" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
            </section> }
          </div>
        </main>
        {prodotti?.general?.data.attributes.footer && <Footer footerServizioClienti={prodotti.general.data.attributes.footer.footerServizioClienti} footerAbout={prodotti.general.data.attributes.footer.footerAbout} footerSocial={prodotti.general.data.attributes.footer.footerSocial} />}
      </>
    );
};
