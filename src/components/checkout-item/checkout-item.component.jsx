import React, { useContext } from "react";
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
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
	const { removeItemFromCart, addItemToCart, clearItemFromCart } =
		useContext(CartContext);
	const { name, quantity, imageUrl, price } = cartItem;

	const clearItemHandler = () => clearItemFromCart(cartItem);

	const addItemHandler = () => addItemToCart(cartItem);

	const removeItemHandler = () => removeItemFromCart(cartItem);

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
