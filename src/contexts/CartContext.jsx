import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateCartItemQuantity: () => {}
});

export default CartContext;