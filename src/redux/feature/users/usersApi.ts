import { baseApi } from "@/redux/base/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ role }) => ({
        url: "/user",
        method: "GET",
        credentials: "include",
        params: { role },
      }),
    }),
    getSingleUser: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetSingleUserQuery } = usersApi;
