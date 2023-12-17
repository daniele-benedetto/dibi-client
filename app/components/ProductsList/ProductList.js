import { useEffect, useState } from "react";
import Button from "@/app/components/Button/Button";
import CartItem from "@/app/components/CartItem/CartItem";

export default function ProductList({cartItems, totalPrice, action, onAdd, onRemove}) {

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
                    <p className="text-lg font-bold">{totalPrice}€</p>
                </div>
                <Button action={action} text='Vai al checkout' type="filled" />
            </div> }
        </div>
    );
}