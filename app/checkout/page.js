"use client";
import {Elements} from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { useStateCartContext } from '@/app/context/cart';
import CheckoutForm from '@/app/components/CheckoutForm/CheckoutForm';
import getStripe from '@/app/lib/getStripe';
import ProductList from '@/app/components/ProductsList/ProductList';
import { BiLoaderAlt } from 'react-icons/bi';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { weigthPriceRange, distancePriceRange, unionEurope } from '@/app/lib/const';
import { UserContext } from '@/app/context/user';
import { useRouter } from 'next/navigation';

const stripePromise = getStripe();

export default function App() {

    const { checkLogin, id  } = useContext(UserContext);
    const router = useRouter();

    const { cartItems, paymentIntent, setPaymentIntent, onAdd, onRemove } = useStateCartContext();
    const [clientSecret, setClientSecret] = useState("");
    const { totalPrice, totalWeight } = useStateCartContext();
    const [country, setCountry] = useState("");
    const [weightPrice, setWeightPrice] = useState(0);
    const [distancePrice, setDistancePrice] = useState(0);
    const [totalPriceWithSale, setTotalPriceWithSale] = useState(0);
    const [paidFor, setPaidFor] = useState(false);
    
    const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
    };

    if (paidFor) {
    // Display success message, modal or redirect user to success page
    alert("Thank you for your purchase!");
    }

    useEffect(() => {
        const checkUser = async () => {
            const res = await checkLogin();
            if (res.status !== 200) {
                return false;
            }
        }
        checkUser();
    }, []);

    useEffect(() => {
        if (totalWeight > 0) {
            weigthPriceRange.map((item) => {
                if (totalWeight >= item.min && totalWeight <= item.max) {
                    setWeightPrice(item.price)
                }
            }
        )};
        if (country) {
            if (country === 'IT') {
                setDistancePrice(distancePriceRange[0].price)
            } else if (unionEurope.includes(country)) {
                setDistancePrice(distancePriceRange[1].price)
            } else {
                setDistancePrice(distancePriceRange[2].price)
            }
        }
    }, [totalWeight, country]);

    useEffect(() => {
        if(cartItems && cartItems.length < 1) {
            router.push('/');
        } else {
            
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
            return res.json()
        })
        .then((data) => {
            setClientSecret(data.paymentIntent.client_secret)
            setPaymentIntent(data.paymentIntent.id)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [cartItems, weightPrice, distancePrice, totalPrice]);

    const stripeOptions = {
        clientSecret,
    }

    const  paypalOptions  =  { 
        "client-id" : "AT-bzXqJdHw3GSBE1yv4ReworPiDFoqO7-zOYvkHCQFSdvlLaTMg2Li67XZZ0peMFUh2ZB1tsfeD9UkQ", 
    } ; 

    return (
        <main className='bg-white p-5'>
            <section className='container m-auto flex flex-wrap'>
                <div className='flex justify-center w-full md:w-2/3'>
                    <div className='w-full max-w-lg'>
                        {clientSecret && (
                            <>
                                <Elements options={stripeOptions} stripe={stripePromise}>
                                    <CheckoutForm clientSecret={clientSecret} setCountry={setCountry} weightPrice={weightPrice} distancePrice={distancePrice} userId={id} totalPriceWithSale={totalPriceWithSale} />
                                </Elements>
                                <div className='py-5'>
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
                                                                value: totalPriceWithSale > 0 ? totalPriceWithSale + weightPrice + distancePrice : totalPrice + weightPrice + distancePrice,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={async (data, actions) => {
                                                const order = await actions.order.capture(); 
                                                handleApprove(data.orderID);
                                              }}
                                            onError={(err) => {
                                                //verify error
                                            }}
                                            onCancel={() => {
                                                // Display cancel message, modal or redirect user to cancel page or back to cart
                                            }}
                                            onClick={(data, actions) => {
                                                //verify conditions
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            </>
                        )}
                        {!clientSecret && (
                            <div className="flex justify-center items-center h-screen">
                                <div className="flex flex-col justify-center items-center">
                                    <BiLoaderAlt color={'black'} size={120} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex justify-center w-full md:w-1/3'>
                    {cartItems.length > 0 && <ProductList cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} totalPriceWithSale={totalPriceWithSale} setTotalPriceWithSale={setTotalPriceWithSale} />}
                </div>
            </section>
        </main>
   );
};