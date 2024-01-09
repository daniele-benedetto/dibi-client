"use client"

import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements, LinkAuthenticationElement, AddressElement } from "@stripe/react-stripe-js"
import { useStateCartContext } from "@/app/context/cart";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

const unionEurope = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'];

export default function CheckoutForm({clientSecret, setCountry, weightPrice, distancePrice, country}) {

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
      partita_iva: '',
    });
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const { cartItems, setTotalQty, totalPrice, setTotalPrice } = useStateCartContext();

    const router = useRouter();

  useEffect(() => {
    if (!stripe || !clientSecret) return
  }, [stripe, clientSecret])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(false)

    if (!stripe || !elements) {
      setError(true)
      return
    }

    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email) {
      setError(true)
      return
    }

    if(email && !regexEmail.test(email)) {
      setError(true);
      return;
    }

    if(fattura && Object.values(fatturaData).some((value) => value === '')) {
      setError(true)
      return;
    }

    if(country !== 'IT' && !unionEurope.includes(country)) {
      alert('Ci dispiace, al momento non effettuiamo spedizioni al di fuori dell\'Unione Europea.')
      setError(true)
      return;
    }

    setIsLoading(true);

    await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    }).then(async(result) => {
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
            name: result.paymentIntent.shipping.name,
            email: email,
            address: result.paymentIntent.shipping.address.line1 +' ' + result.paymentIntent.shipping.address.city + ' ' + result.paymentIntent.shipping.address.postal_code + ' ' + result.paymentIntent.shipping.address.country,
            products: products,
            totale_costo_di_spedizione: (parseFloat(distancePrice) + parseFloat(weightPrice)).toFixed(2),
            totale_costo_prodotti: (parseFloat(totalPrice)).toFixed(2),
            total: (parseFloat(parseFloat(totalPrice) + parseFloat(distancePrice) + parseFloat(weightPrice))).toFixed(2),
            fattura: fattura,
            indirizzo: fatturaData.indirizzo,
            codice_postale: fatturaData.codice_postale,
            codice_fiscale: fatturaData.codice_fiscale,
            codice_univoco_sdi: fatturaData.codice_univoco_sdi,
            ragione_sociale: fatturaData.ragione_sociale,
            partita_iva: fatturaData.partita_iva
          }
        })
        }).then((result) => {
          setIsLoading(false);
          setTotalQty(0);
          setTotalPrice(0);
          return router.push('/thank-you');
        }).catch((error) => {
            alert('Ci dispiace, il tuo pagamento è stato rifiutato. Per favore, verifica i dettagli del pagamento e riprova. Se il problema persiste, contatta il nostro servizio clienti per assistenza.')
        });
      }).catch((error) => {
        setIsLoading(false);
        alert('Ci dispiace, il tuo pagamento è stato rifiutato. Per favore, verifica i dettagli del pagamento e riprova. Se il problema persiste, contatta il nostro servizio clienti per assistenza.')
      });
    }



  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <AddressElement onChange={(e) => setCountry(e.value.address.country)} options={{mode: 'shipping'}} />
      <div className="w-full flex flex-col mb-2">
        <label htmlFor="email" className="text-sm">Email</label>
        <input value={email} placeholder="email" type="text" id="email" className={`p-2 border-2 rounded-md ${error && !email ? 'border-red-500' : 'border-gray-300'}`} onChange={(e) => setEmail(e.target.value)} />
        { error && !email && <p className="text-red-500 text-sm">Inserisci la tua email oppure correggila</p> }
      </div>
      <PaymentElement />
      <div className="w-full flex items-center my-3">
          <input type="checkbox" className="mr-2 w-5 h-5" onChange={(e) => setFattura(e.target.checked)} />
          <p className="text-sm">Richiedi fattura</p>
      </div>
      { fattura && Object.keys(fatturaData).map((key, index) => {
        return (
          <div className="w-full flex flex-col" key={index}>
            <label htmlFor={key} className="text-sm">{key.replace(/_/g, ' ')}</label>
            <input value={fatturaData[key]} placeholder={key.replace(/_/g, " ")} type="text" id={key} className={`p-2 border-2 rounded-md ${error && !fatturaData[key] ? 'border-red-500' : 'border-gray-300'}`} onChange={(e) => setFatturaData({...fatturaData, [key]: e.target.value})} />
            { error && !fatturaData[key] && <p className="text-red-500 text-sm">Se desideri la fattura, il campo {key.replace(/_/g, " ")} è obbligatorio</p> }
          </div>
        )
      })}
      <div className="w-full flex h-12 items-baseline">
          <p className="text-lg font-bold">Totale:</p>
          <p className="text-lg font-bold">{(totalPrice + distancePrice + weightPrice).toFixed(2)}€</p>
          <span className="ml-2 text-xs text-gray-400">Di cui {(distancePrice + weightPrice).toFixed(2)}€ di consegna</span>
      </div>
      { isLoading ? <Button type={'filled'} text={'Pagamento in corso'} /> : <Button type={'filled'} text={'Paga'} /> }
    </form>
  )
}

