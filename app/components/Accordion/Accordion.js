import React, { useState } from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';


const Accordion = ({title, content}) => {

    const [visible, setVisible] = useState(false);

    return (
        <>
            <div onClick={() => setVisible(!visible)} className='flex w-full justify-between p-2 mt-2 rounded background-first-color cursor-pointer'>
                <div className='flex'>
                    <div className='text-black font-bold'>{title}</div>
                </div>
                <div className="flex items-center justify-center">
                    { visible ? <BsArrowDown color="white" size={20} /> : <BsArrowUp color="white" size={20} /> }
                </div>
            </div>
            { visible && <div className="shadow-3xl rounded shadow p-4 mb-6">
                {content}
            </div> }
        </>
    );
};

export default Accordion;