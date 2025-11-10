import { apiPost, apiDelete } from "./client";
import { API_ROUTES } from "./routes";

interface AddFavoriteResponse {
  courseId: number;
  id: number;
}

export async function addToFavorites(
  courseId: number
): Promise<AddFavoriteResponse> {
  try {
    return await apiPost<AddFavoriteResponse>(API_ROUTES.favorite, {
      course_id: courseId,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
}
export async function removeFromFavorites(courseId: number): Promise<void> {
  try {
    await apiDelete<void>(API_ROUTES.favorite, {
      course_id: courseId,
    });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
}
