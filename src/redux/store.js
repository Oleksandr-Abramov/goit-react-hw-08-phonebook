// import { configureStore } from '@reduxjs/toolkit/dist/configureStore';
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsReducer';

// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// ];

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  // middleware,
});

// export const persistor = persistStore(store);
