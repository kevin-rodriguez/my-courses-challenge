"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Course } from "@/types/course";
import { toggleFavorite } from "../actions";
import { StarFilledIcon } from "@/components/icons/StarFilledIcon";
import { StarOutlineIcon } from "@/components/icons/StarOutlineIcon";

interface CourseCardProps {
  course: Course;
  onFavoriteChange?: (courseId: string, isFavorite: boolean) => void;
}

export function CourseCard({ course, onFavoriteChange }: CourseCardProps) {
  const [isFavorite, setIsFavorite] = useState(course.favorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async () => {
    if (isLoading) return;

    const previousState = isFavorite;
    const newState = !isFavorite;
    setIsLoading(true);
    setIsFavorite(newState);

    try {
      const result = await toggleFavorite(course.id, isFavorite);

      if (result.success) {
        toast.success(
          newState
            ? `Added ${course.instructorName} to favorites`
            : `Removed ${course.instructorName} from favorites`
        );
        onFavoriteChange?.(course.id, newState);
      } else {
        setIsFavorite(previousState);
        toast.error(result.error || "Failed to update favorite");
      }
    } catch (error) {
      setIsFavorite(previousState);
      toast.error("Failed to update favorite");
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
          <StarFilledIcon className="h-6 w-6 text-yellow-400 drop-shadow-lg" />
        ) : (
          <StarOutlineIcon className="h-6 w-6 text-gray-400 drop-shadow-lg transition-colors group-hover:text-gray-300 dark:text-gray-500 dark:group-hover:text-gray-400" />
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
