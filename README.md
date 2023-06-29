# ABOUT THE APP

Check out the app [here](https://starlit-dolphin-21f139.netlify.app)

Small cart component in which contextAPI and useReducer is used to make a functioning Cart.
The app loads the products from an external Api and loads them with the useEffect hook inside the context.

All the reduce actions are placed in the reducer.js. In here we find the ability to:

- remove all products
- remove a single product
- increase the amount of a product
- decrease the amount of a product
- set loading while the fetch is happening
- display the cart with the data from the fetch

## KEY POINT OF THE PROJECT

Instead of using an array or object, the cart is implemented with

```js
const initialState = {
  loading: false,
  cart: new Map([]),
};
```

By setting it up with a new Map, we are able to perform the CRUD operations in the reducer easier.

For example :

```js
if (action.type === REMOVE) {
  const newCart = new Map(state.cart);
  newCart.delete(action.payload.id);

  return { ...state, cart: newCart };
}
```

This allows delete from the new Map by passing on the product ID sent from the global context that was created.
