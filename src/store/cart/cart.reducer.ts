import { AnyAction } from 'redux';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { setCartItems, setIsCartOpen } from './cart.action';

export const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};

export type CartState = {
	readonly isCartOpen: boolean;
	readonly cartItems: CartItem[];
};

export const cartReducer = (
	state = CART_INITIAL_STATE,
	action = {} as AnyAction
): CartState => {
	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload,
		};
	}
	if (setIsCartOpen.match(action)) {
		return { ...state, isCartOpen: action.payload };
	}
	return state;
};
