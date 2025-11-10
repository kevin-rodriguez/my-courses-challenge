import { Course } from "@/types/course";
import { apiGet } from "./client";
import { API_ROUTES } from "./routes";

interface FetchCoursesParams {
  limit?: number;
  offset?: number;
}

export async function fetchCourses(
  params?: FetchCoursesParams
): Promise<Course[]> {
  try {
    const queryParams: Record<string, string | number> = {};

    if (params?.limit !== undefined) {
      queryParams["page[limit]"] = params.limit;
    }
    if (params?.offset !== undefined) {
      queryParams["page[offset]"] = params.offset;
    }

    return await apiGet<Course[]>(API_ROUTES.courses, queryParams);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}
