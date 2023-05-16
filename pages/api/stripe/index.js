import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req,res) {
    if(req.method === "POST") {
        try {
            const session = await stripe.checkout.sessions.create({
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                allow_promotion_codes: true,
                shipping_address_collection: {
                    allowed_countries: ['IT']
                },
                line_items: req.body.map((item) => {
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `${req.headers.origin}/?&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/`,
            });
            res.status(200).json(session);
        } catch (error) {
            res.status(error.statusCode || 500).json(error.message);
        }
    }
}