import { baseApi } from "@/redux/base/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscription: build.query({
      query: () => ({
        url: "/package",
        method: "GET",
        credentials: "include",
      }),
    }),
    addSubscription: build.mutation({
      query: (data) => ({
        url: "/package",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    deleteSubscription: build.mutation({
      query: (id) => ({
        url: `/package/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
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
  useUpdateSubscriptionMutation
} = subscriptionApi;
