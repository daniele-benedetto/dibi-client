import React from 'react';

const OrderItem = ({item}) => {
    return (
        <div className='flex flex-col p-5 mb-5'>
            <h2 className='text-xl font-bold mb-2'>Ordine #{item.id}</h2>
            <p className='text-md'>Data: {item.publishedAt}</p>
            <p className='text-md'>Totale: {(item.total / 100).toFixed(2)} €</p>
            <p className='text-md'>Lista dei prodotti:</p>
            <ul className='list-disc list-inside'>
                {item.products.map((product, idx) => (
                    <li key={idx}>{product.name} - {product.quantity} x {(product.price / 100).toFixed(2)} €</li>
                ))}
            </ul>
            <hr />
        </div>
    );
}

export default OrderItem;