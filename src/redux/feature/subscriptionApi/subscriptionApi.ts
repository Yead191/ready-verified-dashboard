import { baseApi } from "@/redux/base/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscription: build.query({
      query: ({ type }) => ({
        url: "/package",
        method: "GET",
        credentials: "include",
        params: { type },
      }),
      providesTags: ["Subscription"],
    }),
    addSubscription: build.mutation({
      query: (data) => ({
        url: "/package",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
    deleteSubscription: build.mutation({
      query: (id) => ({
        url: `/package/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Subscription"],
    }),
    updateSubscription: build.mutation({
      query: ({ id, data }) => ({
        url: `/package/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useAddSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptionApi;
