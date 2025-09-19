import { baseApi } from "@/redux/base/baseApi";

const assessmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAssessment: build.query({
      query: ({ page, limit }) => ({
        url: "/assessment",
        method: "GET",
        credentials: "include",
        params: { page, limit },
      }),
      providesTags: ["assessment"],
    }),
    getSingleAssessment: build.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/assessment/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    changeStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `/assessment/change-status/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["assessment"],
    }),
  }),
});
export const {
  useGetAssessmentQuery,
  useGetSingleAssessmentQuery,
  useChangeStatusMutation,
} = assessmentApi;
