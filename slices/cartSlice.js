// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   totalQuantity: 0,
//   totalPrice: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//       state.totalQuantity += 1;
//       state.totalPrice += action.payload.price;
//     },
//     removeFromCart: (state, action) => {
//       const existingItem = state.items.find((item) => item.id === action.payload);
//       if (existingItem) {
//         state.totalQuantity -= existingItem.quantity;
//         state.totalPrice -= existingItem.quantity * existingItem.price;
//         state.items = state.items.filter((item) => item.id !== action.payload);
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0;
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
