// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from '../slices/cartSlice';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import notificationReducer from '../slices/notificationSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    notifications: notificationReducer,
  },
});

export default store;
