"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ProductDetail({title, text}) {

    const [open, setOpen] = useState(false);

    return (
        <div className='flex flex-col mt-10 border-b'>
            <div onClick={() => setOpen(!open)} className='flex justify-between items-center'>
                <h3 className='font-black text-lg uppercase'>{title}</h3>
                { open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            { open && <div className='mt-5'>
                <p className='text-sm'>{text}</p>
            </div> }
        </div>
    );
}