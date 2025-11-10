import { Course } from "@/types/course";
import { apiGet } from "./client";
import { API_ROUTES } from "./routes";

export async function fetchCourses(): Promise<Course[]> {
  try {
    return await apiGet<Course[]>(API_ROUTES.courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}
