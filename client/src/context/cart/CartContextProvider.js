import { createContext, useReducer } from 'react';
import cartReducer from './cartReducer';

export const CartContext = createContext();

const initialState = {
	totalPrice: 0,
	orders: [],
}

const CartContextProvider = props => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addItemHander = order => {
		dispatch({ type: 'ADD', order });
	}

	const removeItemHandler = id => {
		dispatch({ type: 'REMOVE', id });
	}
	const reset = () => {
		dispatch({ type: 'RESET' });
	}
 
	const contextCart = {
		totalPrice: state.totalPrice,
		orders: state.orders,
		onAddItem: addItemHander,
		onRemoveItem: removeItemHandler,
		onReset: reset	
	}

	return (
		<CartContext.Provider value={contextCart}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartContextProvider;