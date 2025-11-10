import Image from "next/image";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-zinc-900">
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
