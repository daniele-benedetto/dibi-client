"use client";
import {Elements} from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { useStateCartContext } from '@/app/context/cart';
import CheckoutForm from '@/app/components/CheckoutForm/CheckoutForm';
import getStripe from '@/app/lib/getStripe';
import ProductList from '@/app/components/ProductsList/ProductList';
import { BiLoaderAlt } from 'react-icons/bi';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { UserContext } from '@/app/context/user';
import { useRouter } from 'next/navigation';
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Loader from '../components/Loader/Loader';
import { GENERAL_QUERY } from '../lib/query';
import { useQuery } from 'urql';

const stripePromise = getStripe();

const unionEurope = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'];

export default function Checkout() {

    const { checkLogin, id  } = useContext(UserContext);
    const router = useRouter();

    const { cartItems, paymentIntent, setPaymentIntent, onAdd, onRemove, setTotalQty } = useStateCartContext();
    const [clientSecret, setClientSecret] = useState("");
    const { totalPrice, totalWeight, setTotalPrice } = useStateCartContext();
    const [country, setCountry] = useState("IT");
    const [weightPrice, setWeightPrice] = useState(0);
    const [distancePrice, setDistancePrice] = useState(0);

    const [results] = useQuery({
        query: GENERAL_QUERY,
    });

    const { data, fetching, error } = results;
    
    const handleApprove = async (order, cartItems) => {
        const products = [];
        cartItems.map((item) => {
            products.push({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            });
        });  

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ 
                data:{
                    name: order.purchase_units[0].shipping.name.full_name,
                    email: order.payer.email_address,
                    address: order.purchase_units[0].shipping.address.address_line_1 +' ' + order.purchase_units[0].shipping.address.admin_area_2 + ' ' + order.purchase_units[0].shipping.address.postal_code + ' ' + order.purchase_units[0].shipping.address.country_code,
                    products: products,
                    totale_costo_di_spedizione: (parseFloat(distancePrice) + parseFloat(weightPrice)).toFixed(2),
                    totale_costo_prodotti: parseFloat(order.purchase_units[0].amount.value).toFixed(2),
                    total: (parseFloat(order.purchase_units[0].amount.value) + parseFloat(distancePrice) + parseFloat(weightPrice)).toFixed(2),
                    /*
                    fattura: fattura,
                    indirizzo: fatturaData.indirizzo,
                    codice_postale: fatturaData.codice_postale,
                    codice_fiscale: fatturaData.codice_fiscale,
                    codice_univoco_sdi: fatturaData.codice_univoco_sdi,
                    ragione_sociale: fatturaData.ragione_sociale,
                    partita_iva: fatturaData.partita_iva
                    */
                }
            })
        }).then((result) => {
            setTotalQty(0);
            setTotalPrice(0);
            return router.push('/thank-you');
        }).catch((error) => {
            console.log(error);
            return <p>Errore</p>;
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        const checkUser = async () => {
            const res = await checkLogin();
            if (res && res.status !== 200) {
                return false;
            }
        }
        checkUser();
    }, []);

    useEffect(() => {
        if(data?.general?.data?.attributes?.spedizione_gratuita >= totalPrice) {
            if (totalWeight > 0) {
                data?.general?.data?.attributes.weight_price.map((item) => {
                    if (totalWeight >= item.min && totalWeight <= item.max) {
                        setWeightPrice(item.price)
                    }
                }
            )};
            if (country) {
                if (country === 'IT') {
                    setDistancePrice(data?.general?.data.attributes.distance_price[0])
                } else if (unionEurope.includes(country)) {
                    setDistancePrice(data?.general?.data.attributes.distance_price[1])
                } else {
                    alert("Mi dispiace, non sono previste consegne fuori dall'unione Europea")
                }
            }
        }
    }, [totalWeight, country, data, cartItems]);

    useEffect(() => {
        if(cartItems && cartItems.length < 1) {
            router.push('/');
        }

        fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: cartItems,
                payment_intent_id: paymentIntent,
                shipping_price: weightPrice + distancePrice,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                console.error('Errore durante la fetch:', res);
            }
            return res.json();
        })
        .then((data) => {
            setClientSecret(data.paymentIntent.client_secret);
            setPaymentIntent(data.paymentIntent.id);
        })
        .catch((err) => {
            console.error('Errore durante la fetch:', err);
        });
        
    }, [cartItems, weightPrice, distancePrice, totalPrice]);

    const stripeOptions = {
        clientSecret,
    }

    const  paypalOptions  =  { 
        "client-id" : "ASFlM6CbsuiGqB7UymzqSVUadXQ-T5xOl1bzuLLi4MszrKjkBlr9yBvF0pqjPyX94Ot83QwUgH-jcofB", 
        "currency" : "EUR",
    } ; 

    if(fetching) return <Loader />;
    if(error) return <p>Errore</p>;

    return (
        <>
            {data?.general?.data?.attributes?.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
            {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} categories={data.categories.data} />}
            <main className='bg-white p-5'>
                <section className='container m-auto flex flex-wrap'>
                    <div className='flex justify-center w-full md:w-2/3'>
                        <div className='w-full max-w-lg'>
                            {clientSecret && (
                                <>
                                    {data?.general?.data?.attributes && <div className='py-5 max-w-xs m-auto'>
                                        <p className='text-center text-xs font-thin'>Oppure paga con:</p>
                                        <PayPalScriptProvider options={paypalOptions}>
                                            <PayPalButtons 
                                                style={{
                                                    color: "gold",
                                                    layout: "horizontal",
                                                    height: 40,
                                                    tagline: false,
                                                }} 
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    currency_code: "EUR",
                                                                    value: totalPrice + weightPrice + distancePrice,
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={async (data, actions) => {
                                                    const order = await actions.order.capture(); 
                                                    handleApprove(order, cartItems);
                                                }}
                                                onError={(err) => {
                                                    alert('Errore durante il pagamento, riprova più tardi')
                                                }}
                                                onCancel={(data) => {
                                                    console.log('cancellato')
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    </div> }
                                    <Elements options={stripeOptions} stripe={stripePromise} >
                                        <CheckoutForm clientSecret={clientSecret} setCountry={setCountry} country={country} weightPrice={weightPrice} distancePrice={distancePrice} userId={id} />
                                    </Elements>
                                </>
                            )}
                            {!clientSecret && (
                                <div className="flex justify-center items-center h-screen">
                                    <div className="flex flex-col justify-center items-center animate-spin">
                                        <BiLoaderAlt color={'black'} size={100} />
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                    <div className='flex justify-center w-full md:w-1/3'>
                        {cartItems.length > 0 && <ProductList cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} totalPrice={totalPrice} /> }
                    </div>
                </section>
            </main>
            {data?.general?.data.attributes.footer && <Footer footerServizioClienti={data.general.data.attributes.footer.footerServizioClienti} footerAbout={data.general.data.attributes.footer.footerAbout} footerSocial={data.general.data.attributes.footer.footerSocial} />}
        </>
    );
};