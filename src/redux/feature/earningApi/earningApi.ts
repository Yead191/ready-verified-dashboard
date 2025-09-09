import { baseApi } from "@/redux/base/baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEarning: build.query<any, any>({
      query: () => ({
        url: "/order",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetEarningQuery } = earningApi;
