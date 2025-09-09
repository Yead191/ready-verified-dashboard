import { baseApi } from "@/redux/base/baseApi";

const assessmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAssessment: build.query({
      query: () => ({
        url: "/assessment",
        method: "GET",
        credentials: "include",
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
  }),
});
export const { useGetAssessmentQuery, useGetSingleAssessmentQuery } =
  assessmentApi;
