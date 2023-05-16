import React from 'react';

const OrderItem = () => {
    return (
        <div className='flex flex-col p-5 mb-5'>
            <h2 className='text-xl font-bold mb-2'>Ordine #1</h2>
            <p className='text-md'>Data: 01/01/2021</p>
            <p className='text-md'>Totale: 100€</p>
            <p className='text-md'>Lista dei prodotti:</p>
            <ul className='text-md mb-5'>
                <li className='flex'>
                    <p>Prodotto 1</p>
                    <p>2 x 15$</p>
                </li>
                <li className='flex'>
                    <p>Prodotto 2</p>
                    <p>1 x 70$</p>
                </li>
            </ul>
            <hr />
        </div>
    );
}

export default OrderItem;