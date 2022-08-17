import React from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from "./checkout.styles.jsx";
import {
	selectCartItems,
	selectCartPrice,
} from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const cartPrice = useSelector(selectCartPrice);
	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<Total>Total: ${cartPrice}</Total>
		</CheckoutContainer>
	);
};

export default Checkout;
