"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Course } from "@/types/course";
import { toggleFavorite } from "../actions";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [isFavorite, setIsFavorite] = useState(course.favorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setIsFavorite(!isFavorite);

    try {
      const result = await toggleFavorite(course.id, isFavorite);

      if (result.success) {
        toast.success(
          !isFavorite
            ? `Added ${course.instructorName} to favorites`
            : `Removed ${course.instructorName} from favorites`
        );
      } else {
        //TODO: Revert on error
        toast.error(result.error);
      }
    } catch (error) {
      //TODO: Revert on error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={handleToggleFavorite}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-zinc-900"
    >
      <div className="absolute right-3 top-3 z-10">
        {isFavorite ? (
          <svg
            className="h-6 w-6 text-yellow-400 drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-gray-400 drop-shadow-lg transition-colors group-hover:text-gray-300 dark:text-gray-500 dark:group-hover:text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
      </div>

      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {course.instructorImageUrl ? (
          <Image
            src={course.instructorImageUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <span className="text-4xl text-gray-400 dark:text-gray-600">
              📚
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {course.instructorName}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-tight text-gray-900 dark:text-white">
          {course.title}
        </h3>
      </div>
    </div>
  );
}
