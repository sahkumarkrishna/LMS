import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const CourseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include", // for cookies to be sent with requests
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "", // This can be left empty if it's a POST to the base URL
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"], // Invalidate tag to refetch courses
    }),

    getCreatorCourses: builder.query({
      query: () => ({
        url: "", // This can be left empty if it's a GET request to the base URL
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"], // Ensure the data is cached under this tag
    }),

    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`, // Include courseId to update a specific course
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useEditCourseMutation,
} = CourseApi;
