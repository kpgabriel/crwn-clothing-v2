require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
	const { amount, cartItems } = JSON.parse(event.body);

	let stripeItems = [];
	const items = cartItems.map((element) => {
		return {
			price_data: {
				currency: 'usd',
				product_data: {
					name: element.name,
					images: [element.imageUrl],
				},
				unit_amount: element.price * 100,
			},
			quantity: element.quantity,
		};
	});

	const session = await stripe.checkout.sessions.create({
		line_items: items,
		mode: 'payment',
		success_url: `${process.env.PUBLIC_ROOT_URL}/success`,
		cancel_url: `${process.env.PUBLIC_ROOT_URL}/checkout`,
	});

	event.redirect = session.url;
	return {
		statusCode: 303,
		body: JSON.stringify(session.url),
	};
};
