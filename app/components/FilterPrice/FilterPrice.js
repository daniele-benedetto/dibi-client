"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function FilterPrice({rangeValue, setRangeValue, rangeMin, rangeMax, title}) {

    const [open, setOpen] = useState(false);

    return (
        <div className='flex flex-col border-b pb-3 mt-10'>
            <div onClick={() => setOpen(!open)} className='flex justify-between items-center cursor-pointer'>
                <h3 className='text-lg font-black'>{title}</h3>
                { open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
        
            { open && <div className='flex items-center m-0 mt-10 md:mt-10'> 
                <span>{rangeMin}</span>
                <input
                    onChange={(e) => setRangeValue(parseInt(e.target.value))}
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