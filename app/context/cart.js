import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const CartContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [paymentIntent, setPaymentIntent] = useState("");

    const onAdd = (product, quantity) => {

        const exist = cartItems.find((item) => item.slug === product.slug && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize);
        if(exist) {
            if(exist.quantity + quantity > exist.selectedStock) {
                return;
            }
            setTotalQty(prevTotal => prevTotal + quantity);
            setTotalPrice(prevTotal => prevTotal + product.price * quantity);
            setTotalWeight(prevTotal => prevTotal + quantity * product.weight);
            setCartItems(
                cartItems.map((item) => 
                    item.slug === product.slug && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize 
                    ? {...exist, quantity: exist.quantity + quantity} 
                    : item
                )
            );
        } else {
            setTotalQty(prevTotal => prevTotal + quantity);
            setTotalPrice(prevTotal => prevTotal + product.price * quantity);
            setTotalWeight(prevTotal => prevTotal + quantity * product.weight);
            setCartItems([...cartItems, {...product, quantity: quantity}]);
        }
    }

    const onRemove = (product) => {
        setTotalQty(prevTotal => prevTotal - 1);
        setTotalPrice(prevTotal => prevTotal - product.price);

        const exist = cartItems.find((item) => item.slug === product.slug && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize);
        
        if(exist.quantity === 1) {
            setCartItems(cartItems.filter((item) => item !== exist));
        } else {
            let newCartItems = cartItems.map((item) =>
            item.slug === exist.slug && item.selectedColor === exist.selectedColor && item.selectedSize === exist.selectedSize
                ? {...exist, quantity: exist.quantity - 1}
                : item
            );
            setCartItems(newCartItems);
        }
    }

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            setCartItems,
            onAdd,
            onRemove,
            totalQty,
            setTotalQty,
            totalPrice,
            setTotalPrice,
            paymentIntent,
            setPaymentIntent,
            totalWeight
        }}>
            {children}
        </Context.Provider>
    );
};

export const useStateCartContext = () => useContext(Context);