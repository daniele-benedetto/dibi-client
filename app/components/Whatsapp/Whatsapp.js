import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';      
const Whatsapp = () => {
    const url = `https://wa.me/+393716275760`;
    return (
        <div className="fixed bottom-0 right-0">
            <div className="flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 border-r-16 bg-green-600">
                <FaWhatsapp size={32} color="white" className="cursor-pointer" onClick={() => window.open(url, '_blank')} />
            </div>
        </div> 
    );
}
export default Whatsapp;