import {useStateCartContext} from '@/app/context/cart';
import { AiOutlineClose } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import Button from '@/app/components/Button/Button';
import { useLockBodyScroll } from '@/app/hooks/useLockBodyScroll';
import ProductList from '@/app/components/ProductsList/ProductList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CartMenu({mobile}) {

    const [totalPriceWithSale, setTotalPriceWithSale] = useState(0);

    const { 
        cartItems, 
        setShowCart, 
        onAdd, 
        onRemove,
        totalPrice,
    } = useStateCartContext();

    useLockBodyScroll();
    const router = useRouter();

    const goToCheckout = () => {
        router.push('/checkout');
        setShowCart(false);
    };

    const onAddProduct = (item) => {
        onAdd(item, 1);
    };

    const onRemoveProduct = (item) => {
        onRemove(item);
    };

    

    return(
        <motion.aside animate={{opacity: 1}} initial={{opacity: 0}} className='w-full h-full z-10 flex flex-col p-10 fixed top-0 left-0 bg-black bg-opacity-50'>
            <motion.div animate={{right: 0}} initial={{right: -400}} className={`${mobile ? 'w-full pt-24' : 'w-1/4 mt-4'} w-1/4 h-full bg-white absolute right-0 top-0 p-5 z-40`}>
                <div className="flex justify-between items-center w-full h-full relative">
                    <Button type='top-right' text={<AiOutlineClose size={20}/>} action={() => setShowCart(false)}  />
                    {cartItems.length < 1 && (
                        <div className='flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            <FaShoppingCart size={64} />
                            <p className="text-xl text-center">Il tuo carrello è vuoto</p>
                        </div>
                    )}
                    {cartItems.length > 0 && <ProductList cartItems={cartItems} action={goToCheckout} totalPrice={totalPrice} onAdd={onAddProduct} onRemove={onRemoveProduct} totalPriceWithSale={totalPriceWithSale} setTotalPriceWithSale={setTotalPriceWithSale} />}
                </div>
            </motion.div>
        </motion.aside>
    );
}