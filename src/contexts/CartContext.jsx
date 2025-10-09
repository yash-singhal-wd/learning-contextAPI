import { createContext, useReducer } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products";

const initialState = {
    items: []
}

const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateCartItemQuantity: () => {}
});

function reducer(state, action) {
    //always return {...state, <whatever you have changed>} in handling actions
    if(action.type == "ADD_ITEM"){
        const updatedItems = [...state.items];
        
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
        
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            updatedItems.push({
                id: action.payload.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }
        
        return {
            ...state,
            items: updatedItems,
        };
    }

    if(action.type == "UPDATE_ITEM"){
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );
        
      const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };
        
        updatedItem.quantity += action.payload.amount;
        
        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }
        
        return {
            ...state,
            items: updatedItems,
        };
    }
    return state;
}

export function CartContextProvider({children}) {
    // understand the line below
    const [shoppingCartState, dispatch] = useReducer( reducer, initialState )
    
    function handleAddItemToCart(id) {
        dispatch({
            type: "ADD_ITEM",
            payload: {id}
        })
    }
    
    function handleUpdateCartItemQuantity(productId, amount) {
        dispatch({
            type: "UPDATE_ITEM",
            payload: {productId, amount}
        })
    }

    const cartCtx = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateCartItemQuantity: handleUpdateCartItemQuantity
    };

    return (
        <CartContext.Provider value={cartCtx}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;