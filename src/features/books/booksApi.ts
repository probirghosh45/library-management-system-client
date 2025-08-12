import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book, CreateBookDto, UpdateBookDto } from './types';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({

    //Get All Books
    getBooks: builder.query<{ data: Book[]; total?: number }, { page?: number; limit?: number } | void>({
      query: (params) => {
        const qp = params ? `?page=${params.page ?? 1}&limit=${params.limit ?? 10}` : '';
        return `/books${qp}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((b) => ({ type: 'Books' as const, id: b._id })),
              { type: 'Books', id: 'LIST' },
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),

    //Get Book by Id
    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }],
    }),

    // Add Book
    createBook: builder.mutation<Book, CreateBookDto>({
      query: (body) => ({
        url: '/books',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Books', id: 'LIST' }],
    }),

    //Update Book
    updateBook: builder.mutation<Book, { id: string; body: UpdateBookDto }>({
      query: ({ id, body }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Books', id: arg.id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // Delete Book
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

export default booksApi;
