// src/app/libraryApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre?: string;
  isbn?: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({

    // Books endpoints
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    getBooks: builder.query<
      { data: Book[]; total?: number },
      { page?: number; limit?: number } | void
    >({
      query: (params) => {
        const qp = params
          ? `?page=${params.page ?? 1}&limit=${params.limit ?? 10}`
          : "";
        return `/books${qp}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((book) => ({
                type: "Books" as const,
                id: book._id,
              })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),

    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),

    updateBook: builder.mutation<Book, { id: string; body: Partial<Book> }>({
      query: ({ id, body }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),

    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = libraryApi;

export default libraryApi;
