"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function FilterPrice({rangeValue, setRangeValue, rangeMin, rangeMax, title, setFilters, filters}) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(rangeValue !== rangeMin) {
            setFilters((prev) => {
                if(prev.filter((filter) => {
                    return filter.title === title;
                }).length > 0) {
                    return prev.map((filter) => {
                        if(filter.title === title) {
                            return {...filter, item: rangeValue};
                        } else {
                            return filter;
                        }
                    });
                }
                return [...prev,{title: title,item: rangeValue}];
            });
        } else {
            setFilters((prev) => {
                return prev.filter((filter) => {
                    return filter.title !== title;
                });
            });
        }

    }, [rangeValue]);


    useEffect(() => {
        if(filters && filters.filter((filter) => {
            return filter.title === title;
        }).length > 0) {
            setRangeValue(filters.filter((filter) => {
                return filter.title === title;
            })[0].item);
        } else {
            setRangeValue(rangeMax);
        }
    }, [filters]);
    
    return (
        <div className='flex flex-col border-b pb-3 mt-10'>
            <div onClick={() => setOpen(!open)} className='flex justify-between items-center cursor-pointer'>
                <h3 className='text-lg font-black'>{title}</h3>
                { open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
        
            { open && <div className='flex items-center m-0 mt-10 md:mt-10'> 
                <span>{rangeMin}</span>
                <input
                    onChange={(e) => setRangeValue(e.target.value)} 
                    type="range" 
                    min={rangeMin} 
                    max={rangeMax} 
                    value={rangeValue} 
                    steps="1" 
                />
                <span>{rangeValue}</span>
            </div> }
        </div>
    );
}