import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import booksApi from "@/features/books/booksApi";
import libraryApi from "@/services/libraryApi";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, libraryApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
