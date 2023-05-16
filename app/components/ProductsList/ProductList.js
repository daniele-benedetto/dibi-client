import { useEffect, useState } from "react";
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";

export default function ProductList({cartItems, totalPrice, action, onAdd, onRemove, totalPriceWithSale, setTotalPriceWithSale}) {

    useEffect(() => {
        let newTotalPrice = 0;
        cartItems.forEach((item) => {
            let categorySale = 0;
            let subCategorySale = 0;
            let productSale = 0;
    
            if(item.category.data.attributes.sale.data) {
                categorySale = item.category.data.attributes.sale.data.attributes.amount;
            }
    
            if(item.subcategory.data.attributes.sale.data) {
                subCategorySale = item.subcategory.data.attributes.sale.data.attributes.amount;
            }
    
            if(item.sale.data) {
                productSale = item.sale.data.attributes.amount;
            }
            
            newTotalPrice += (item.price - Math.max(categorySale, subCategorySale, productSale)) * item.quantity;
        });
        setTotalPriceWithSale(newTotalPrice);
    }, [cartItems]);


    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col w-full h-full overflow-y-auto">
                {cartItems.map((item,idx) => (
                    <CartItem key={idx} item={item} onAdd={onAdd} onRemove={onRemove} />
                ))}
            </div>
            { action && <div className="flex flex-col justify-between items-center w-full h-20 border-t border-gray-200">
                <div className="flex justify-between items-center w-full h-12">
                    <p className="text-lg font-bold">Totale:</p>
                    {totalPriceWithSale > 0 ? <p className="text-lg font-bold">{totalPriceWithSale}€</p> : <p className="text-lg font-bold">{totalPrice}€</p>}
                </div>
                <Button action={action} text='Vai al checkout' type="filled" />
            </div> }
        </div>
    );
}