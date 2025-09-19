import { baseApi } from "@/redux/base/baseApi";

const templateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: ({ page, limit }) => ({
        url: "/template",
        method: "GET",
        credentials: "include",
        params: { page, limit },
      }),
      providesTags: ["Templates"],
      keepUnusedDataFor: 0,
    }),
    addTemplate: builder.mutation({
      query: (data) => ({
        url: "/template",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/template/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateTemplate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/template/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),
    getSingleTemplate: builder.query({
      query: (id) => ({
        url: `/template/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Templates"],
    }),
  }),
});
export const {
  useGetSingleTemplateQuery,
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplatesQuery,
  useUpdateTemplateMutation,
} = templateApi;
