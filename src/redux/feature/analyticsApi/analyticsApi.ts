import { baseApi } from "@/redux/base/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // polling summary
    getAnalytics: build.query({
      query: ({ year }) => ({
        url: "/dashboard",
        method: "GET",
        credentials: "include",
        params: { year },
      }),
    }),
    
  }),
});
export const { useGetAnalyticsQuery } = analyticsApi;
