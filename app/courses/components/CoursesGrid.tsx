"use client";

import { useState } from "react";
import { Course } from "@/types/course";
import { CourseCard } from "./CourseCard";
import { loadMoreCourses } from "../actions";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface CoursesGridProps {
  courses: Course[];
}

type FilterType = "all" | "favorites";

const PAGE_SIZE = 10;

export function CoursesGrid({ courses: initialCourses }: CoursesGridProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const {
    data: courses,
    setData: setCourses,
    isLoadingMore,
    hasMore,
    loadMoreRef,
  } = useInfiniteScroll({
    initialData: initialCourses,
    pageSize: PAGE_SIZE,
    loadMore: async (offset, limit) => {
      const result = await loadMoreCourses(offset, limit);
      return {
        success: result.success,
        data: result.courses,
        error: result.error,
      };
    },
    enabled: filter === "all",
  });

  const handleFavoriteChange = (courseId: string, isFavorite: boolean) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, favorite: isFavorite } : course
      )
    );
  };

  const filteredCourses =
    filter === "favorites"
      ? courses.filter((course) => course.favorite)
      : courses;

  const favoritesCount = courses.filter((course) => course.favorite).length;

  return (
    <>
      <div className="mb-8 flex items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          <span>All Courses</span>
          <span className="inline-block min-w-10 text-center text-xs opacity-60">
            ({courses.length})
          </span>
        </button>
        <button
          onClick={() => setFilter("favorites")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "favorites"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          <span className="flex items-center gap-1">
            <span>⭐</span>
            <span>Favorites</span>
          </span>
          <span className="inline-block min-w-10 text-center text-xs opacity-60">
            ({favoritesCount})
          </span>
        </button>
      </div>

      {filteredCourses.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>

          {filter === "all" && hasMore && (
            <div ref={loadMoreRef} className="mt-8 flex justify-center">
              {isLoadingMore && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300"></div>
                  <span>Loading more courses...</span>
                </div>
              )}
            </div>
          )}
        </>
      ) : filter === "favorites" ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-zinc-900">
          <span className="mb-4 text-5xl">⭐</span>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            No favorites yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Click on any course card to add it to your favorites
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            No courses yet
          </h3>
        </div>
      )}
    </>
  );
}
