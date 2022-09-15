import React from "react";
import {
	CheckOutItemContainer,
	ImageContainer,
	Name,
	Quantity,
	Price,
	Value,
	Arrow,
	RemoveButton,
} from "./checkout-item.styles.jsx";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart,
} from "../../store/cart/cart.action";

const CheckoutItem = ({ cartItem }) => {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();
	const { name, quantity, imageUrl, price } = cartItem;

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));

	const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

	const removeItemHandler = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));

	return (
		<CheckOutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<Name>{name}</Name>

			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>

			<Price>{price}</Price>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckOutItemContainer>
	);
};

export default CheckoutItem;
