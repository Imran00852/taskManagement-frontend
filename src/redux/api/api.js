import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}`,
    credentials: "include",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    getAllTasks: builder.query({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, isCompleted }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: { isCompleted },
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export default api;

export const {
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = api;
