import { apiSlice } from '../../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticlePosts: builder.query({
      query: ({ query }) => (query ? `/news?${query}` : `/news${query}`),
      transformResponse: (response: any) => response,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((id: any) => ({
                type: 'Articles' as const,
                id,
              })),
              'Articles',
            ]
          : ['Articles'],
    }),
  }),
});

export const { useGetArticlePostsQuery, useLazyGetArticlePostsQuery } = extendedApiSlice;
