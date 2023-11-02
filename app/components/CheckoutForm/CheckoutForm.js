"use client"

import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements, LinkAuthenticationElement, AddressElement } from "@stripe/react-stripe-js"
import { useStateCartContext } from "@/app/context/cart";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

export default function CheckoutForm({clientSecret, setCountry, weightPrice, distancePrice, totalPriceWithSale}) {

    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [fattura, setFattura] = useState(false);
    const [fatturaData, setFatturaData] = useState({
      ragione_sociale: '',
      indirizzo: '',
      codice_postale: '',
      codice_fiscale: '',
      codice_univoco_sdi: '',
    });

    const { cartItems, setTotalQty, totalPrice, setTotalPrice } = useStateCartContext();

    const router = useRouter();

  useEffect(() => {
    if (!stripe || !clientSecret) return
  }, [stripe, clientSecret])

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements) {
      return
    }

    if(fattura && Object.values(fatturaData).some((value) => value === '')) {
      return alert('Compila tutti i campi per richiedere la fatturazione');
    }

    setIsLoading(true);

    await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    }).then((result) => {
      const products = [];
      cartItems.map((item) => {
          products.push({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
          });
      });

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
        method: 'POST',
        mode: 'cors',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ 
          data:{
            name: result.paymentIntent.shipping.name,
            email: result.paymentIntent.receipt_email,
            address: result.paymentIntent.shipping.address.line1 +' ' + result.paymentIntent.shipping.address.city + ' ' + result.paymentIntent.shipping.address.postal_code + ' ' + result.paymentIntent.shipping.address.country,
            products: products,
            total: (parseFloat(result.paymentIntent.amount) + parseFloat(distancePrice) + parseFloat(weightPrice)).toFixed(2),
            fattura: fattura,
            indirizzo: fatturaData.indirizzo,
            codice_postale: fatturaData.codice_postale,
            codice_fiscale: fatturaData.codice_fiscale,
            codice_univoco_sdi: fatturaData.codice_univoco_sdi,
            ragione_sociale: fatturaData.ragione_sociale,
          }
        })
        }).then((result) => {
          setIsLoading(false);
          setTotalQty(0);
          setTotalPrice(0);
          return router.push('/thank-you');
        }).catch((error) => {
            console.log(error);
            Error();
        });
      }).catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
    }



  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <AddressElement onChange={(e) => setCountry(e.value.address.country)} options={{mode: 'shipping'}} />
      <LinkAuthenticationElement />
      <PaymentElement />
      <div className="w-full flex items-center my-3">
          <input type="checkbox" className="mr-2 w-5 h-5" onChange={(e) => setFattura(e.target.checked)} />
          <p className="text-sm">Richiedi fattura</p>
      </div>
      { fattura && Object.keys(fatturaData).map((key, index) => {
        return (
          <div className="w-full flex flex-col" key={index}>
            <label htmlFor={key} className="text-sm">{key.replace(/_/g, ' ')}</label>
            <input type="text" id={key} className="p-2 border border-gray-300 rounded-md" onChange={(e) => setFatturaData({...fatturaData, [key]: e.target.value})} />
          </div>
        )
      })}
      <div className="w-full flex h-12 items-baseline">
          <p className="text-lg font-bold">Totale:</p>
          <p className="text-lg font-bold">{ totalPriceWithSale > 0 ? (totalPriceWithSale + distancePrice + weightPrice).toFixed(2) : (totalPrice + distancePrice + weightPrice).toFixed(2)}€</p>
          <span className="ml-2 text-xs text-gray-400">Di cui {(distancePrice + weightPrice).toFixed(2)}€ di consegna</span>
      </div>
      { isLoading ? <Button type={'filled'} text={'Pagamento in corso'} /> : <Button type={'filled'} text={'Paga'} /> }
    </form>
  )
}

