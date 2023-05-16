import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items, shipping_price) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.price * item.quantity + shipping_price;
    }, 0)
    return totalPrice;
};

export default async function handler(req,res) {

    const { items, payment_intent_id, shipping_price } = req.body
    
    const total = calculateOrderAmount(items, shipping_price) * 100;

    const orderData = {
        amount: total,
        currency: "eur",
        status: "pending",
        paymentIntentID: payment_intent_id,
        products: {
          create: items.map((item) => ({
            name: item.name,
            description: item.description || null,
            unit_amount: parseFloat(item.price),
            quantity: item.quantity,
          })),
        },
      }


    if (payment_intent_id) {
            const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
        if (current_intent) {
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, { amount: total })
            res.status(200).json({ paymentIntent: updated_intent })
            return
        }
    } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
    })

    orderData.paymentIntentID = paymentIntent.id
    res.status(200).json({ paymentIntent })
  }
}
