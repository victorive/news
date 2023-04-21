import { apiSlice } from '../../api/apiSlice';

interface User {
  _id: string;
  isNewUser: boolean;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  username?: string;
  city: string;
  name: string;
  id: string;
  avatar: string;
  cover: string;
  dob: string;
  userId: string;
}

interface ListUsers<User> {
  data: {
    docs: User[];
    page: number;
    totalDocs: number;
    limit: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
    total: number;
  };
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `/profile`,
      transformResponse: (response: any) => response.data,
      providesTags: () => ['User'],
    }),
    getNewsSources: builder.query({
      query: () => `/news-sources`,
      transformResponse: (response: any) => response,
     
    }),
    getAuthors: builder.query({
      query: () => `/authors`,
      transformResponse: (response: any) => response,
     
    }),
    getCategories: builder.query({
      query: () => `/categories`,
      transformResponse: (response: any) => response,
     
    }),
    registerUser: builder.mutation({
      query: (values) => ({
        url: '/auth/register',
        method: 'POST',
        body: {
          ...values,
        },
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),
    setPreferences: builder.mutation({
      query: (values) => ({
        url: '/preferences',
        method: 'POST',
        body: {
          ...values,
        },
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),

    logIn: builder.mutation({
      query: (values) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          ...values,
        },
      }),
      transformResponse: (response: any, meta: any) => {
        console.log(response)
        localStorage.setItem('auth-token', `Bearer ${response.token}`);
        return response;
      },
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLogInMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useSetPreferencesMutation,
  useGetNewsSourcesQuery,
  useGetCategoriesQuery,
  useGetAuthorsQuery
} = extendedApiSlice;
