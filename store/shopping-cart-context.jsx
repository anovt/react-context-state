import { createContext,useState,useReducer } from "react";
import { DUMMY_PRODUCTS } from "../src/dummy-products";
export const CartConetxt = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemToCart:() => {}
});


function shoppingCartReducer(state,action)
{

  if(action.type === 'ADD_ITEM')
  {

    const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
  }

  if(action.type === 'UPDATE_ITEM')
  {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };

  }


  return state;
}


export const  CartConetxtProvider = ({children})=> {

  const [shoppingCartState,shoppingCartDispatch] = useReducer(shoppingCartReducer,{items: []});








  function handleAddItemToCart(id) {

    shoppingCartDispatch({type:'ADD_ITEM',payload:id});


  }

  function handleUpdateCartItemQuantity(productId, amount) {

    shoppingCartDispatch({type:'UPDATE_ITEM',productId,amount});


  }


  const ctxValue = {

    items : shoppingCartState.items,
    addItemToCart:handleAddItemToCart,
    updateItemToCart:handleUpdateCartItemQuantity
  }


  return  <CartConetxt.Provider value={ctxValue}>{children}</CartConetxt.Provider>


}