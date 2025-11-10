"use server";

import { addToFavorites, removeFromFavorites } from "@/lib/api/favorites";
import { fetchCourses } from "@/lib/api/courses";
import { Course } from "@/types/course";
import { PAGE_SIZE } from "@/lib/constants";

export async function toggleFavorite(courseId: string, isFavorite: boolean) {
  try {
    const courseIdNum = Number(courseId);

    if (isFavorite) {
      await removeFromFavorites(courseIdNum);
    } else {
      await addToFavorites(courseIdNum);
    }

    return { success: true };
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update favorite",
    };
  }
}

export async function loadMoreCourses(
  offset: number,
  limit: number = PAGE_SIZE
): Promise<{ success: boolean; courses?: Course[]; error?: string }> {
  try {
    const courses = await fetchCourses({ limit, offset });
    return { success: true, courses };
  } catch (error) {
    console.error("Error loading more courses:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to load more courses",
    };
  }
}
