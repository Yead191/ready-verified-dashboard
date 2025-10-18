import { baseApi } from "@/redux/base/baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // about us page
    getSupportContent: build.query({
      query: ({ type }) => ({
        url: `/disclaimer?type=${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // add about us content
    addSupportContent: build.mutation({
      query: ({ data }) => ({
        url: `/disclaimer`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    // get faq page
    getFaqContent: build.query({
      query: ({ type }) => ({
        url: `/faq`,
        method: "GET",
        credentials: "include",
        params: { type },
      }),
      providesTags: ["faq"],
    }),
    // add faq
    addFaq: build.mutation({
      query: ({ data }) => ({
        url: `/faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    // update faq
    updateFaq: build.mutation({
      query: ({ id, data }) => {
        // console.log("Bwaa", data);
        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["faq"],
    }),
    // delete faq
    deleteFaq: build.mutation({
      query: ({ id }) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetSupportContentQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useAddSupportContentMutation,
  useGetFaqContentQuery,
  useDeleteFaqMutation,
} = supportApi;
