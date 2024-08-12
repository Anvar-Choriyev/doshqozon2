const cartReducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case 'ADD': {
			const updatedTotalPrice = state.totalPrice + (action.order.price*action?.order?.count);
			// const updatedTotalPrice = state.totalPrice + action.item.price * action.item.count;

			const existingItemIndex = state.orders.findIndex(i => i.id === action.order.id);

			const existingItem = state.orders[existingItemIndex];

			let updatedItems;

			if (existingItem) {
				updatedItems = [...state.orders];
				updatedItems[existingItemIndex] = { ...existingItem, count:existingItem.count+action.order.count }
				// updatedItems[existingItemIndex] = { ...existingItem, count: existingItem.count + action.item.count }
			} else {
				updatedItems = [...state.orders, action.order];
			}

			return { totalPrice: updatedTotalPrice, orders: updatedItems }
		}
		case 'REMOVE': {
			const existingItemIndexOnRemove = state.orders.findIndex(i => i.id === action.id);
			const existingItemOnRemove = state.orders[existingItemIndexOnRemove];
			let updatedItemsOnRemove;

			if (existingItemOnRemove) {
				if (existingItemOnRemove?.count === 1) {
					updatedItemsOnRemove = state.orders.filter(i => i.id !== existingItemOnRemove.id);
				} else {
					updatedItemsOnRemove = [...state.orders];
					updatedItemsOnRemove[existingItemIndexOnRemove] = { ...existingItemOnRemove, count: existingItemOnRemove?.count - 1 }
				}
				let updatedTotalPriceOnRemove = state.totalPrice - existingItemOnRemove.price;

				return { totalPrice: updatedTotalPriceOnRemove, orders: updatedItemsOnRemove }
			}
			return state
		};
		// eslint-disable-next-line no-fallthrough
		case "RESET":
			console.log("reset");
			return { totalPrice: 0, orders: [] };

		// eslint-disable-next-line no-fallthrough
		default: return state;
	}
}

export default cartReducer;