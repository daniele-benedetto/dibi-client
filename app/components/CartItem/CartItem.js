"use client";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import Button from "@/app/components/Button/Button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartItem({item, onAdd, onRemove}) {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(item.selectedIndex);
    }, [item]);

    return(
        <div key={item.id} className="flex justify-between items-center w-full h-26 border-b border-gray-200">
            <div className="flex items-center">
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image.data.attributes.url}`} alt="product image" width={80} height={100} />
                <div className="flex flex-col justify-between items-start ml-4">
                    <h5 className="text-lg font-bold">{item.name}</h5>
                    <p className="text-sm text-gray-500">{item.quantity} x {item.price}€</p>
                    <span className="text-sm text-gray-500">{item.colors} - {item.sizes}</span>
                </div>
            </div>
            {onAdd && onRemove && (
                <div className="flex items-center">
                    <Button text={<AiFillPlusCircle size={20} />} type="empty" action={() => onAdd(item, 1)} />
                    <Button text={<AiFillMinusCircle size={20} />} type="empty" action={() => onRemove(item)} />
                </div>
            )}
        </div>
    );
}

