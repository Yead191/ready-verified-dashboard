import { baseApi } from "@/redux/base/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ role, page, limit }) => ({
        url: "/user",
        method: "GET",
        credentials: "include",
        params: { role, page, limit },
      }),
    }),
    getSingleUser: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    lockUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetSingleUserQuery, useLockUserMutation } =
  usersApi;
