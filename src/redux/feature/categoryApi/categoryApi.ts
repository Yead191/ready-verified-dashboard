import { baseApi } from "@/redux/base/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: "/category",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
    }),
    addCategory: build.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useUpdateCategoryMutation, useAddCategoryMutation } = categoryApi;
