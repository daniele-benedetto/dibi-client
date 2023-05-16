"use client";
import useWindowSize from "@/app/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button/Button";
import FilterMenu from "../FilterMenu/FilterMenu";
import FilterPrice from "../FilterPrice/filterPrice";
import { usePathname } from 'next/navigation';

export default function Sidebar({products, setFilters, sidebarIsOpen, setSidebarIsOpen, filters, resetFilters}) {

    const pathname = usePathname();

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [rangeValue, setRangeValue] = useState(0);
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(0);

    useEffect(() => {
        const getCategories = () => {
            const categories = products.map((product) => {
                return product.attributes.category.data.attributes.name;
            }).filter((category, index, self) => {
                return self.indexOf(category) === index;
            }).map((category) => {
                return category;
            });
            setCategories(categories);
        };

        const getSubcategories = () => {
            const subcategories = products.map((product) => {
                return product.attributes.subcategory.data.attributes.name;
            }).filter((subcategory, index, self) => {
                return self.indexOf(subcategory) === index;
            }).map((subcategory) => {
                return subcategory;
            });
            setSubcategories(subcategories);
        };

        const getColors = () => {
            setColors(products[0].attributes.colors);
        };

        const getSizes = () => {
            setSizes(products[0].attributes.sizes);
        };

        const getRange = () => {
            const prices = products.map((product) => {
                return product.attributes.price;
            });
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setRangeMin(min);
            setRangeMax(max);
            setRangeValue(max);
        };

        getRange();
        getColors();
        getSizes();
        getCategories();
        getSubcategories();
    }, []);

    const size = useWindowSize();

    return (
        size.width > 768 ? (
            <aside className='w-1/3 flex flex-col p-10'>
                { !pathname.includes('/categoria') && !pathname.includes('/sottocategoria') && <FilterMenu setFilters={setFilters} filters={filters} title='Categoria' items={categories} /> }
                { !pathname.includes('/sottocategoria') && <FilterMenu setFilters={setFilters} filters={filters} title='Sottocategoria' items={subcategories} /> }
                <FilterMenu setFilters={setFilters} filters={filters} title='Colore' items={colors} />
                <FilterMenu setFilters={setFilters} filters={filters} title='Taglia' items={sizes} />
                <FilterPrice setFilters={setFilters} filters={filters} rangeValue={rangeValue} setRangeValue={setRangeValue} rangeMin={rangeMin} rangeMax={rangeMax} title={'Prezzo'}/>
                <div className="h-10"></div>
                <Button type="container-center" text={"Rimuovi filtri"} action={() => resetFilters()} />
            </aside>
        ) : size.width < 768 && sidebarIsOpen ? (
            <aside className={`${sidebarIsOpen ? 'flex' : 'hidden'} w-full min-h-full z-30 flex-col p-10 fixed top-0 left-0 bg-black bg-opacity-50`}>
                <div className="w-3/4 h-full bg-white absolute right-0 top-0 p-5">
                    <FilterMenu setFilters={setFilters} filters={filters} title='Categoria' items={categories} />
                    <FilterMenu setFilters={setFilters} filters={filters} title='Sottocategoria' items={subcategories} />
                    <FilterMenu setFilters={setFilters} filters={filters} title='Colore' items={colors} />
                    <FilterMenu setFilters={setFilters} filters={filters} title='Taglia' items={sizes} />
                    <FilterPrice setFilters={setFilters} filters={filters} rangeValue={rangeValue} setRangeValue={setRangeValue} rangeMin={rangeMin} rangeMax={rangeMax} title={'Prezzo'}/>
                    <div className="h-10"></div>
                    <Button type="container-center" text={"Rimuovi filtri"} action={() => resetFilters()} />
                    <Button type="top-left" text={<AiOutlineClose size={20} color={'black'} />} action={() => setSidebarIsOpen(false)} />
                </div>
                <div className="w-1/4 h-full absolute top-0 left-0" onClick={() => setSidebarIsOpen(false)}></div>
            </aside>
        ) : (
            <aside className={`hidden w-full h-full z-30 flex-col p-10 fixed top-0 left-0 bg-black bg-opacity-50`}>
                <div className="w-3/4 h-full bg-white absolute right-0 top-0 p-10">
                    <FilterPrice setFilters={setFilters} filters={filters} rangeValue={rangeValue} setRangeValue={setRangeValue} rangeMin={rangeMin} rangeMax={rangeMax} title={'Prezzo'}/>
                </div>
            </aside>
        )
    );
}