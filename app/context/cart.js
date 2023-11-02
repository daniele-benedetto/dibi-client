import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const CartContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [paymentIntent, setPaymentIntent] = useState("");

    const saveCartToLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const getCartFromLocalStorage = () => {
        const storedCartData = localStorage.getItem('cart');
        if (storedCartData) {
            return JSON.parse(storedCartData);
        }
        return null;
    };

    const onAdd = (product, quantity) => {

        const exist = cartItems.find((item) => item.slug === product.slug);
        if(exist) {
            if(exist.quantity + quantity > exist.selectedStock) {
                return;
            }
            setTotalQty(prevTotal => prevTotal + quantity);
            setTotalPrice(prevTotal => prevTotal + product.price * quantity);
            setTotalWeight(prevTotal => prevTotal + quantity * product.weight);
            setCartItems(
                cartItems.map((item) => 
                    item.slug === product.slug
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

        saveCartToLocalStorage({
            cartItems: exist 
                ? cartItems.map((item) => 
                    item.slug === product.slug
                    ? {...exist, quantity: exist.quantity + quantity} 
                    : item
                )
                : [...cartItems, {...product, quantity: quantity}],
            totalQty: totalQty + quantity,
            totalPrice: totalPrice + product.price * quantity,
            totalWeight: totalWeight + quantity * product.weight,
        });

    }

    const onRemove = (product) => {
        setTotalQty(prevTotal => prevTotal - 1);
        setTotalPrice(prevTotal => prevTotal - product.price);

        const exist = cartItems.find((item) => item.slug === product.slug);
        
        if(exist.quantity === 1) {
            setCartItems(cartItems.filter((item) => item !== exist));
        } else {
            let newCartItems = cartItems.map((item) =>
            item.slug === exist.slug
                ? {...exist, quantity: exist.quantity - 1}
                : item
            );
            setCartItems(newCartItems);
        }

        saveCartToLocalStorage({
            cartItems: exist.quantity === 1 
                ? cartItems.filter((item) => item !== exist)
                : cartItems.map((item) =>
                    item.slug === exist.slug
                        ? {...exist, quantity: exist.quantity - 1}
                        : item
                ),
            totalQty: totalQty - 1,
            totalPrice: totalPrice - product.price,
            totalWeight: totalWeight - product.weight,
        });

    }

    useEffect(() => {
        console.log('useEffect')
        const storedCartData = getCartFromLocalStorage();
        console.log(storedCartData)
        if (storedCartData) {
            setCartItems(storedCartData.cartItems);
            setTotalQty(storedCartData.totalQty);
            setTotalPrice(storedCartData.totalPrice);
            setTotalWeight(storedCartData.totalWeight);
        }
    }, []);

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
            totalWeight,
        }}>
            {children}
        </Context.Provider>
    );
};

export const useStateCartContext = () => useContext(Context);