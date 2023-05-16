import React, { useState } from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';


const Accordion = () => {

    const [index, setIndex] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSetIndex = (index) => (activeIndex !== index) && setActiveIndex(index);
    return (
        <>
            <div onClick={() => handleSetIndex(index)} className='flex w-full justify-between p-2 mt-2 rounded bg-black cursor-pointer'>
                <div className='flex'>
                    <div className='text-white font-bold'>{'titoloooooo'}</div>
                </div>
                <div className="flex items-center justify-center">
                    { activeIndex === index ? <BsArrowDown color="white" size={20} /> : <BsArrowUp color="white" size={20} /> }
                </div>
            </div>
            {activeIndex === index && <div className="shadow-3xl rounded shadow p-4 mb-6">
                {'contenutoooooo'}
            </div> }
        </>
    );
};

export default Accordion;