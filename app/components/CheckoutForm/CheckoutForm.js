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

    setIsLoading(true);

    await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    }).then((result) => {
      const products = [];
      cartItems.map((item) => {
          let index = item.selectedIndex;
          products.push({
              id: item.id,
              name: item.name,
              color: item.selectedColor,
              size: item.selectedSize,
              quantity: item.quantity,
              price: item.price,
              variant_id: item.product_variants.data[index].id,
          });
      });
      console.log(products)
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
        }})
        }).then((result) => {
          setIsLoading(false);
          setTotalQty(0);
          setTotalPrice(0);
          return router.push('/thank-you');
        }).catch((error) => {
            console.log(error);
            router.push('/error');
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
      <div className="w-full flex h-12 items-baseline">
          <p className="text-lg font-bold">Totale:</p>
          <p className="text-lg font-bold">{ totalPriceWithSale > 0 ? (totalPriceWithSale + distancePrice + weightPrice).toFixed(2) : (totalPrice + distancePrice + weightPrice).toFixed(2)}€</p>
          <span className="ml-2 text-xs text-gray-400">Di cui {(distancePrice + weightPrice).toFixed(2)}€ di consegna</span>
      </div>
      { isLoading ? <Button type={'filled'} text={'Pagamento in corso'} /> : <Button type={'filled'} text={'Paga'} /> }
    </form>
  )
}

