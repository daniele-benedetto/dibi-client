"use client";

import Button from "@/app/components/Button/Button";
import ProductDetail from "@/app/components/ProductDetail/ProductDetail";
import ProductDetailWrapper from "@/app/components/ProductDetailWrapper/ProductDetailWrapper";
import ProductFocus from "@/app/components/ProductFocus/ProductFocus";
import ProductSingleImage from "@/app/components/ProductSingleImage/ProductSingleImage";
import { useStateCartContext } from "@/app/context/cart";
import { useContext, useEffect, useState } from "react";
import { BsBoxSeam, BsCreditCard2Back } from "react-icons/bs";
import { FiRotateCw } from "react-icons/fi";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "@/app/lib/query";
import Loader from "@/app/components/Loader/Loader";
import Toast from "@/app/components/Toast/Toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "@/app/context/user";
import useWindowSize from "@/app/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import ProductPrimaryImage from "@/app/components/ProductPrimaryImage/ProductPrimaryImage";

export default function Prodotto({params}) {

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [product, setProduct] = useState(null);
    const [index, setIndex] = useState(0);
    const [toastProduct, setToastProduct] = useState(false);
    const [toastFavorite, setToastFavorite] = useState(false);
    const [isNotUser, setIsNotUser] = useState(false);
    const [stock, setStock] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [sale, setSale] = useState(0);

    const {onAdd, cartItems} = useStateCartContext();
    const { checkLogin, userWishlist, doWishList, user  } = useContext(UserContext);

    const size = useWindowSize();
    const router = useRouter();


    const handleClick = (idx) => {
        if(size.width < 768) {
            setSelectedImageIndex(idx);
        }
    }

    const toogleFavorite = async () => {
        if(!user) {
            setIsNotUser(true);
            return;
        }
        const newUserWishlist = [...userWishlist];
        if(isFavorite)  {
            setIsFavorite(false);
            newUserWishlist.map((wish, idx) => {
                if(wish.id == product.id) {
                    newUserWishlist.splice(idx, 1);
                }
            });
        } else {
            setIsFavorite(true);
            newUserWishlist.push(product);
        }

        const response = await doWishList(newUserWishlist);
        if(response && response.status === 200) {
            setToastFavorite(true);
        }
    }

    const onAddProduct = () => {
        setErrorMessage('');
        setToastProduct(false);
        
        if(!selectedColor) {
            setErrorMessage('Seleziona prima un colore');
            return;
        }

        if(!selectedSize) {
            setErrorMessage('Seleziona prima una taglia');
            return;
        }
    
        onAdd(product, quantity);
        setStock(stock - quantity);
        setQuantity(1);
        setToastProduct(true);

    }

    const onSelectedColor = (color) => {
        let i = 0
        let variantStock = 0;

        product.product_variants.data.map((variante, idx) => {
            if(variante.attributes.color == color) {
                i = idx;
            }
            if(color && selectedSize && variante.attributes.color == color && variante.attributes.size == selectedSize) {
                variantStock = variante.attributes.stock;
            }
        });

        setSelectedColor(color);
        setErrorMessage('');
        setIndex(i);
        setStock(variantStock);
        setQuantity(1);
        setProduct({
            ...product,
            selectedColor: color,
            selectedStock: variantStock,
            
        });
    }

    const onSelectedSize = (size) => {
        let variantStock = 0;

        product.product_variants.data.map((variante) => {
            if(size && selectedColor && variante.attributes.size == size && variante.attributes.color == selectedColor) {
                variantStock = variante.attributes.stock;
            }
        });

        setSelectedSize(size);
        setErrorMessage('');
        setStock(variantStock);
        setQuantity(1);
        setProduct({
            ...product,
            selectedSize: size,
            selectedStock: variantStock
        });
    }

    const [results] = useQuery({
        query: PRODUCT_QUERY,
        variables: {
            slug: params.prodotto
        }
    });

    const {data, fetching, error} = results;

    useEffect(() => {
        if(data) {
            setProduct({
                ...data.products.data[0].attributes,
                selectedColor: data.products.data[0].attributes.colors[0],
                selectedIndex: 0,
                id: data.products.data[0].id,
            })
            setSelectedColor(data.products.data[0].attributes.colors[0]);
            
            let categorySale = 0;
            let subCategorySale = 0;
            let productSale = 0;

            if(data.products.data[0].attributes.category.data.attributes.sale.data) {
                categorySale = data.products.data[0].attributes.category.data.attributes.sale.data.attributes.amount;
            }

            if(data.products.data[0].attributes.subcategory.data.attributes.sale.data) {
                subCategorySale = data.products.data[0].attributes.subcategory.data.attributes.sale.data.attributes.amount;
            }

            if(data.products.data[0].attributes.sale.data) {
                productSale = data.products.data[0].attributes.sale.data.attributes.amount;
            }

            setSale(Math.max(categorySale, subCategorySale, productSale));
        }
    
    }, [data]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setToastProduct(false);
            setToastFavorite(false);
            setIsNotUser(false);
          }, 3000);
      
         return () => clearTimeout(timeout);
    }, [toastProduct, toastFavorite, setIsNotUser]);

    useEffect(() => {
        if(userWishlist && product) {
            userWishlist.map((wish) => {
                if(wish.id == product.id) {
                    setIsFavorite(true);
                }
            });
        }
    }, [userWishlist]);

    useEffect(() => {
        if(product) {
            setProduct({
                ...product,
                selectedIndex: index
            });
        }
    }, [index]);

    useEffect(() => {
        if(product && cartItems.length > 0) {
            cartItems.map((item) => {
                if(
                    item.id == product.id
                    && item.selectedColor == product.selectedColor
                    && item.selectedSize == product.selectedSize
                ) {
                    data.products.data[0].attributes.product_variants.data.map((variante, idx) => {
                        if(variante.attributes.color == selectedColor && variante.attributes.size == selectedSize) {
                            setStock(data.products.data[0].attributes.product_variants.data[idx].attributes.stock - item.quantity);
                            setProduct({
                                ...product,
                                product_variants: {
                                    ...data.products.data[0].attributes.product_variants,
                                    data: [
                                        ...data.products.data[0].attributes.product_variants.data.slice(0, idx),
                                        {
                                            ...data.products.data[0].attributes.product_variants.data[idx],
                                            attributes: {
                                                ...data.products.data[0].attributes.product_variants.data[idx].attributes,
                                                stock: data.products.data[0].attributes.product_variants.data[idx].attributes.stock - item.quantity
                                            }
                                        },
                                        ...data.products.data[0].attributes.product_variants.data.slice(idx + 1)
                                    ]
                                }
                            });
                        }
                    });
                }
            });
        }
    }, [cartItems, selectedColor, selectedSize, quantity]);

    useEffect(() => {
        const checkUser = async () => {
            const res = await checkLogin();
            if (res && res.status === 200) {
                return true;
            }
            return false;
        }
        checkUser();
    }, []);

    if(fetching) return <Loader />;
    if(error) return router.push('/not-found');
    
    return (
        <main className='bg-white p-5'>
            { toastProduct && <Toast type={'success'} text={'Prodotto aggiungo al carrello'} setToast={setToastProduct} /> }
            { toastFavorite && <Toast type={isFavorite ? 'success' : 'alert'} text={isFavorite ? 'Prodotto aggiunto alla tua wishlist' : 'Prodotto rimosso dalla tua wishlist'} setToast={setToastFavorite} /> }
            { isNotUser && <Toast type={'danger'} text={'Devi essere loggato per aggiungere un prodotto alla tua wishlist'} setToast={setIsNotUser} /> }
            <div className='m-auto w-full max-w-[1400px]'>
                <div className='flex flex-wrap'>
                    <div className='w-full md:w-2/3'>
                        <div className='flex flex-wrap'>
                            { size.width < 768 && product && product.product_variants.data[index] && <ProductPrimaryImage image={product.product_variants.data[index].attributes.gallery.data.attributes.gallery.data[selectedImageIndex].attributes.url} /> }
                            {product && product.product_variants.data[index] && product.product_variants.data[index].attributes.gallery.data.attributes.gallery.data.map((image, idx) => (
                                <ProductSingleImage handleClick={handleClick} key={idx} idx={idx} image={image.attributes.url} name={product.name} />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col w-full md:w-1/3 mt-10'>
                        <h2 className='text-3xl font-black mb-3'>{product && product.name}</h2>
                        {sale > 0 && product && <div className='flex items-center'>
                            <span className='font-black text-2xl line-through text-red-700'>{product.price.toFixed(2)}€</span>
                            <span className='font-black text-2xl ml-2'>{(product.price - sale).toFixed(2)}€</span>
                        </div> }
                        {sale == 0 && product && <div className='flex items-center'>
                                <span className='font-black text-2xl'>{product.price.toFixed(2)}€</span>
                        </div> }
                        <ProductDetailWrapper title="Colore">
                            {product && product.colors.map((color, idx) => (
                                <Button key={idx} color={color} type={selectedColor === color ? 'quad-active' : 'quad'} action={() => onSelectedColor(color)} />
                            ))}
                        </ProductDetailWrapper>
                        <ProductDetailWrapper title="Taglia">
                            {product && product.sizes.map((size, idx) => (
                                <Button key={idx} text={size} type={selectedSize === size ? 'quad-active' : 'quad'} action={() => onSelectedSize(size)} />
                            ))}
                        </ProductDetailWrapper>
                        <ProductDetailWrapper title="Quantità">
                            <div className='flex flex-col'>
                                <div className='flex flex-row'>
                                    <Button text='-' type='quad' action={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
                                    <Button text={quantity} type='quad' />
                                    <Button text='+' type='quad' action={() => setQuantity(quantity < stock ? quantity + 1 : quantity )} />
                                </div>
                                {selectedColor && selectedSize && <small className={stock > 0 ? 'text-gray-600' : 'text-red-600'}>{stock > 0 ? 'Disponibilità ' + stock : 'Non disponibile'}</small>}
                            </div>
                        </ProductDetailWrapper>
                        <div className='flex flex-col mt-5'>
                            { errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                                <span className="block sm:inline">{errorMessage}</span> 
                            </div> }
                            <div className='flex flex-col mt-10'>
                                <h5 className="mb-3 font-bold text-xs">Combinazione selezionata:</h5>
                                <div className='font-bold text-sm'>Colore: <span className='font-normal uppercase'>{selectedColor}</span></div>
                                <div className='font-bold text-sm'>Taglia: <span className='font-normal uppercase'>{selectedSize}</span></div>    
                            </div>
                            <div className='flex flex-col mt-10'>
                                { stock > 0 && <Button text='Aggiungi al carrello' type="filled" action={onAddProduct} /> }
                                { stock == 0 && <Button text={!selectedColor ? 'Seleziona un colore' : !selectedSize ? 'Seleziona una taglia' : 'Non disponibile'} type="disable" /> }
                                <div onClick={toogleFavorite} className='flex flex-row items-center mt-3 cursor-pointer'>
                                    { !isFavorite ? <AiOutlineHeart /> : <AiFillHeart /> }
                                    <Button text={!isFavorite ? "Aggiungi alla wishlist" : "Presente nella wishlist"} type="underline" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-10 items-center'>
                            <ProductFocus title={'Spedizione gratuita'} text={'su tutti gli ordini a partitre da 70€'} icon={<BsBoxSeam className='text-4xl' />} />
                            <ProductFocus title={'Reso gratuito'} text={'entro 14 giorni dalla consegna'} icon={<FiRotateCw className='text-4xl' />} />
                            <ProductFocus title={'Pagamento sicuro'} text={'con carta di credito o paypal'} icon={<BsCreditCard2Back className='text-4xl' />} />
                        </div>
                        <div className='mt-10 flex flex-col'>
                            <ProductDetail title="Descrizione" text={product && product.description} />
                            <ProductDetail title="Composizione" text={product && product.materials} />
                            <ProductDetail title="Resi e spedizioni" text={'Se hai cambiato idea, puoi restituire gratuitamente un prodotto entro 14 giorni dalla consegna. Non si effettuano rimborsi o cambi di prodotti personalizzati né di intimo e calze. Il rimborso sarà elaborato entro 14 giorni dalla data del ritorno degli articoli presso il nostro magazzino e dopo che questo avrà effettuato il controllo qualità dei prodotti resi. Se hai riscontrato un problema con il prodotto, ti invitiamo a contattarci all’indirizzo help@umbroitalia.it prima di effettuare il reso o rispedire gli articoli: sarà nostra cura offrirti una soluzione adeguata.'} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

}