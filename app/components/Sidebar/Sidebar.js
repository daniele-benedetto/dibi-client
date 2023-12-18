"use client";
import useWindowSize from "@/app/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@/app/components/Button/Button";
import FilterMenu from "@/app/components/FilterMenu/FilterMenu";
import FilterPrice from "@/app/components/FilterPrice/FilterPrice";
import { usePathname } from 'next/navigation';

export default function Sidebar({setFilters, sidebarIsOpen, setSidebarIsOpen, filters, resetFilters, categories = [], subcategories = [], rangeValue, rangeMax, rangeMin, setRangeValue}) {

    const pathname = usePathname();
    const size = useWindowSize();

    return (
        size.width > 768 ? (
            <aside className='w-1/3 flex flex-col p-10'>
                { !pathname.includes('/categoria') && !pathname.includes('/sottocategoria') && <FilterMenu setFilters={setFilters} filters={filters} title='Categoria' items={categories} /> }
                { !pathname.includes('/sottocategoria') && <FilterMenu setFilters={setFilters} filters={filters} title='Sottocategoria' items={subcategories} /> }
                <FilterPrice setFilters={setFilters} filters={filters} rangeValue={rangeValue} setRangeValue={setRangeValue} rangeMin={rangeMin} rangeMax={rangeMax} title={'Prezzo'}/>
                <div className="h-10"></div>
                <Button type="container-center" text={"Rimuovi filtri"} action={() => resetFilters()} />
            </aside>
        ) : size.width < 768 && sidebarIsOpen ? (
            <aside className={`${sidebarIsOpen ? 'flex' : 'hidden'} w-full min-h-full z-30 flex-col p-10 fixed top-0 left-0 bg-black bg-opacity-50`}>
                <div className="w-3/4 h-full bg-white absolute right-0 top-0 p-5">
                    <FilterMenu setFilters={setFilters} filters={filters} title='Categoria' items={categories} />
                    <FilterMenu setFilters={setFilters} filters={filters} title='Sottocategoria' items={subcategories} />
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