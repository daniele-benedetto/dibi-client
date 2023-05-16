"use client;"

import { useEffect, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function FilterMenu({title, items, setFilters, filters}) {

    const [selectedItem, setSelectedItem] = useState('Tutti');
    const [open, setOpen] = useState(false);

    const handleSelect = (item) => {
        setSelectedItem(item);
        if(item !== 'Tutti') {
            setFilters((prev) => {
                if(prev.filter((filter) => {
                    return filter.title === title;
                }).length > 0) {
                    return prev.map((filter) => {
                        if(filter.title === title) {
                            return {...filter, item: item};
                        } else {
                            return filter;
                        }
                    });
                }
                return [...prev,{title: title,item: item}];
            });
        } else {
            setFilters((prev) => {
                return prev.filter((filter) => {
                    return filter.title !== title;
                });
            });
        }
    };

    useEffect(() => {
        if(filters && filters.filter((filter) => {
            return filter.title === title;
        }).length > 0) {
            setSelectedItem(filters.filter((filter) => {
                return filter.title === title;
            })[0].item);
        } else {
            setSelectedItem('Tutti');
        }
    }, [filters]);
            

    return (
        <div className='flex flex-col border-b pb-3 mt-10'>
            <div onClick={() => setOpen(!open)} className='flex justify-between items-center cursor-pointer'>
                <h3 className='text-lg font-black'>{title}</h3>
                { open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
        
            { open && <ul className='flex flex-col'>
                <li onClick={() => handleSelect('Tutti')} className='py-2 text-gray-600 hover:text-gray-800 cursor-pointer relative'>
                    {selectedItem === 'Tutti' ? <ImCheckmark className="absolute top-0 translate-y-3/4 left-0 -translate-x-full" /> : null}
                    <a>Tutti</a>
                </li>
                {items.map((item, index) => {
                    return (
                        <li key={index} onClick={() => handleSelect(item)} className='py-2 text-gray-600 hover:text-gray-800 cursor-pointer relative'>
                            {selectedItem === item ? <ImCheckmark className="absolute top-0 translate-y-3/4 left-0 -translate-x-full" /> : null}
                            <a>{item}</a>
                        </li>
                    );
                })}
            </ul> }
        </div>
    );
}