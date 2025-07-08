import { useEffect, useReducer } from "react";
import { itemsReducer } from "../reducer/itemsReducer";
import { AddProductCart, DeleteProductCart, UpdateQuantityProductCart } from "../reducer/itemsActions";

const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

export const useItemsCart = () => {

	const [ cartItems, dispatch ] = useReducer(itemsReducer, initialCartItems);

	useEffect(() => {
			sessionStorage.setItem('cart', JSON.stringify(cartItems) );
	}, [ cartItems ]);

	const handlerAddProductCart = (product) => {

		const hasItem = cartItems.find((i) => i.product.id === product.id);
		if (hasItem) {
			// ELIMINA Y AGREGA AL FINAL, REORDENA
			// setCartItems([
			// 	...cartItems.filter((i) => i.product.id !== product.id),
			// 	{
			// 		product,
			// 		quantity: hasItem.quantity + 1
			// 	}
			// ])
			// ACTUALIZA EL VALOR SIN REORDENAR
			// setCartItems(
			// 	cartItems.map((i) => {
			// 		if (i.product.id === product.id){
			// 			i.quantity = i.quantity + 1;
			// 		}
			// 		return i;
			// 	})
			// );
			dispatch(
				{
					type: UpdateQuantityProductCart,
					payload: product
				}
			)
		} else {
			dispatch({
				type: AddProductCart,
				payload: product,
			});
		}
		
	}

	const handlerDeleteProductCart = (id) => {
		dispatch(
			{
				type: DeleteProductCart,
				payload: id,
			}
		)
	}
	return {
		cartItems,
		handlerAddProductCart,
		handlerDeleteProductCart,
	}
}
