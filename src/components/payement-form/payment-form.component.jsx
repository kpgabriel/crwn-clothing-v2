import React, { useState } from 'react';
import {
	CardElement,
	useStripe,
	useElements,
	PaymentElement,
} from '@stripe/react-stripe-js';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
	PaymentFormContainer,
	FormContainer,
	PaymentButton,
} from './payment-form.styles';
import { useSelector } from 'react-redux';
import { selectCartPrice, selectCartItems } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartPrice);
	const currentUser = useSelector(selectCurrentUser);
	const cartItems = useSelector(selectCartItems);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}
		setIsProcessingPayment(true);
		const response = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: amount * 100 }),
		}).then((res) => res.json());

		const {
			paymentIntent: { client_secret },
		} = response;

		const paymentResult = stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		});

		if (paymentResult.error) {
			alert(paymentResult.error);
		} else {
			if ((await paymentResult).paymentIntent.status === 'succeeded') {
				alert('payment success');
			}
		}

		setIsProcessingPayment(false);
	};
	const stripePayment = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}
		setIsProcessingPayment(true);
		const response = await fetch(
			'/.netlify/functions/create-checkout-session',
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ amount: amount * 100, cartItems: cartItems }),
			}
		).then((res) => res.json());
		window.location.replace(response);
		setIsProcessingPayment(false);
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={stripePayment}>
				{/* <h2>Credit Card Payment: </h2>
				<CardElement /> */}
				<PaymentButton
					isLoading={isProcessingPayment}
					buttonType={BUTTON_TYPE_CLASSES.inverted}
				>
					Checkout
				</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
