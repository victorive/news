import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface customError {
  data: {
    message: string;
    path: string;
    request: string;
    status: string;
    timestamp: string;
  };
  status: Number;
}

const eventUrl = "http://127.0.0.1:8000/api/v1";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: eventUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth-token");
      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
    credentials: "include",
  }) as BaseQueryFn<string | FetchArgs, unknown, customError, {}>,
  tagTypes: ["User", "Article", "Articles", "Sources"],

  endpoints: (builder) => ({}),
});
