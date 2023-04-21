import { apiSlice } from "../../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewsSources: builder.query({
      query: () => `/news-sources`,
      transformResponse: (response: any) => response,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((id: any) => ({
                type: "Articles" as const,
                id,
              })),
              "Articles",
            ]
          : ["Articles"],
    }),
  }),
});

export const { useGetNewsSourcesQuery } = extendedApiSlice;
