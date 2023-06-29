import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';      
const Whatsapp = () => {
    const url = `https://web.whatsapp.com/send?phone=3703211722`;
    return (
        <div className="fixed bottom-0 right-0">
            <div className="flex flex-col items-center justify-center w-16 h-16 border-r-16 bg-green-600">
                <FaWhatsapp size={32} color="white" className="cursor-pointer" onClick={() => window.open(url, '_blank')} />
            </div>
        </div> 
  );
}
export default Whatsapp;