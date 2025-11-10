"use server";

import { addToFavorites, removeFromFavorites } from "@/lib/api/favorites";

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
