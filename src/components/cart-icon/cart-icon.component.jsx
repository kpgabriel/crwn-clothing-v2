import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon,
} from "./cart-icon.styles.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
	selectCartCount,
	selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import React from "react";

const CartIcon = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartCount = useSelector(selectCartCount);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
