"use client";

import Button from "@/app/components/Button/Button";
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
import ProductPrimaryImage from "@/app/components/ProductPrimaryImage/ProductPrimaryImage";
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Error from "next/error";
import FsLightbox from "fslightbox-react";

export default function Prodotto({params}) {

    const [errorMessage, setErrorMessage] = useState('');
    const [product, setProduct] = useState(null);
    const [toastProduct, setToastProduct] = useState(false);
    const [toastFavorite, setToastFavorite] = useState(false);
    const [isNotUser, setIsNotUser] = useState(false);
    const [stock, setStock] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [sale, setSale] = useState(0);
    const [toggler, setToggler] = useState(false);
    const [images, setImages] = useState([]);

    const {onAdd, cartItems} = useStateCartContext();
    const { checkLogin, userWishlist, doWishList, user  } = useContext(UserContext);

    const size = useWindowSize();

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

        if(stock == 0) {
            setErrorMessage('Prodotto non disponibile');
            return;
        }
    
        onAdd(product, quantity);
        setStock(stock - quantity);
        setQuantity(1);
        setToastProduct(true);

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

            if(cartItems.length > 0) {
                cartItems.map((item) => {
                    if(item.id == data.products.data[0].id) {
                        setStock(data.products.data[0].attributes.stock - item.quantity);
                    } else {
                        setStock(data.products.data[0].attributes.stock);
                    }
                });
            } else {
                setStock(data.products.data[0].attributes.stock);
            }
            
            setProduct({
                ...data.products.data[0].attributes,
                id: data.products.data[0].id,
            })
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
        if(product && cartItems.length > 0) {
            cartItems.map((item) => {
                if(item.id == product.id) {
                    setStock(product.stock - item.quantity);
                }
            }
        )};
    }, [cartItems]);

    useEffect(() => {

        if (product?.gallery?.data && product.gallery.data.length > 0) {
            let images = [];
            product.gallery.data.map((item) => {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.attributes.url}`
                images.push(url);
            }); 
            setImages(images);
        }
    }, [product]);

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
    if(error) return Error();
    
    return (
        <>
            {data?.general?.data.attributes.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
            {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} categories={data.categories.data} />}
            <main className='bg-white p-5'>
                { toastProduct && <Toast type={'success'} text={'Prodotto aggiunto al carrello'} setToast={setToastProduct} /> }
                { toastFavorite && <Toast type={isFavorite ? 'success' : 'alert'} text={isFavorite ? 'Prodotto aggiunto alla tua wishlist' : 'Prodotto rimosso dalla tua wishlist'} setToast={setToastFavorite} /> }
                { isNotUser && <Toast type={'danger'} text={'Devi essere loggato per aggiungere un prodotto alla tua wishlist'} setToast={setIsNotUser} /> }
                <FsLightbox
                    toggler={toggler}
                    sources={images}
                />
                <div className='m-auto w-full max-w-[1400px]'>
                    <div className='flex flex-wrap'>
                        <div className='w-full md:w-2/3'>
                            <div className='flex flex-wrap'>
                                { size.width < 768 && product && <ProductPrimaryImage image={product.gallery.data[0].attributes.url} name={product.name} /> }
                                {product && product.gallery.data.map((image, idx) => (
                                    <ProductSingleImage handleClick={() => setToggler((prevState) => !toggler)} key={idx} idx={idx} image={image.attributes.url} name={product.name} />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col w-full md:w-1/3 mt-10'>
                            <h2 className='text-3xl font-black mb-3'>{product && product.name}</h2>
                            { product?.description && <p className="text-md">{product.description}</p> }
                            { sale > 0 && product && product.price && <div className='flex items-center'>
                                <span className='font-black text-2xl line-through text-red-700'>{product?.price?.toFixed(2)}€</span>
                                <span className='font-black text-2xl ml-2'>{(product.price - sale).toFixed(2)}€</span>
                            </div> }
                            { sale == 0 && product && product.price && <div className='flex items-center'>
                                    <span className='font-black text-2xl'>{product.price.toFixed(2)}€</span>
                            </div> }
                            { product?.modello && <div className='flex items-center mt-5'>
                                <span className='font-bold text-sm'>Modello: </span>
                                <span className='font-normal text-sm ml-2'>{product.modello}</span>
                            </div> }
                            { product?.marchio && <div className='flex items-center mt-5'>
                                <span className='font-bold text-sm'>Marchio: </span>
                                <span className='font-normal text-sm ml-2'>{product.marchio}</span>
                            </div> }
                            { product?.genere && <div className='flex items-center mt-5'>
                                <span className='font-bold text-sm'>Genere: </span>
                                <span className='font-normal text-sm ml-2'>{product.genere}</span>
                            </div> }
                            { product?.confezione_originale && <div className='flex items-center mt-5'>
                                <span className='font-bold text-sm'>Confezione originale: </span>
                                <span className='font-normal text-sm ml-2'>{product.confezione_originale ? 'Si' : 'No'}</span>
                            </div> }
                            {product?.condizioni && <div className='flex items-center mt-5'>
                                <span className='font-bold text-sm'>Condizioni: </span>
                                <span className='font-normal text-sm ml-2'>{product.condizioni}</span>
                            </div> }
                            {product?.funzionante && <div className='flex items-center mt-5'>
                                <span className='font-bold text-sm'>Funzionamento: </span>
                                <span className='font-normal text-sm ml-2'>{product.funzionante ? 'Si' : 'No'}</span>
                            </div> }
                            {product?.colors && <div className='flex items-center mt-5'>
                                <span className='font-bold text-sm'>Colore: </span>
                                <span className='font-normal text-sm ml-2'>{product.colors}</span>
                            </div> }
                            {product?.sizes && <div className='flex items-center mt-5'>
                                <span className='font-bold text-sm'>Taglia: </span>
                                <span className='font-normal text-sm ml-2'>{product.sizes}</span>
                            </div> }
                            <ProductDetailWrapper title="Quantità">
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <Button text='-' type='quad' action={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
                                        <Button text={quantity} type='quad' />
                                        <Button text='+' type='quad' action={() => setQuantity(quantity < stock ? quantity + 1 : quantity )} />
                                    </div>
                                    {stock >= 0 && <small className={stock > 0 ? 'text-gray-600' : 'text-red-600'}>{stock > 0 ? 'Disponibilità ' + stock : 'Non disponibile'}</small>}
                                </div>
                            </ProductDetailWrapper>
                            <div className='flex flex-col mt-5'>
                                { errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                                    <span className="block sm:inline">{errorMessage}</span> 
                                </div> }
                                <div className='flex flex-col mt-10'>
                                    {stock > 0 && <Button text='Aggiungi al carrello' type="filled" action={onAddProduct} /> }
                                    {stock == 0 && <Button text='Non disponibile' type="filled" /> }
                                    <div onClick={toogleFavorite} className='flex flex-row items-center mt-3 cursor-pointer'>
                                        { !isFavorite ? <AiOutlineHeart /> : <AiFillHeart /> }
                                        <Button text={!isFavorite ? "Aggiungi alla wishlist" : "Presente nella wishlist"} type="underline" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-10 items-center'>
                                <ProductFocus title={'Spedizione gratuita'} text={'su tutti gli ordini a partitre da 100€'} icon={<BsBoxSeam className='text-4xl' />} />
                                <ProductFocus title={'Reso gratuito'} text={'entro 14 giorni dalla consegna'} icon={<FiRotateCw className='text-4xl' />} />
                                <ProductFocus title={'Pagamento sicuro'} text={'con carta di credito o paypal'} icon={<BsCreditCard2Back className='text-4xl' />} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {data?.general?.data.attributes.footer && <Footer footerServizioClienti={data.general.data.attributes.footer.footerServizioClienti} footerAbout={data.general.data.attributes.footer.footerAbout} footerSocial={data.general.data.attributes.footer.footerSocial} />}
        </>
    );

}