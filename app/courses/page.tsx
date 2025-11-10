import { fetchCourses } from "@/lib/api/courses";
import { CourseCard } from "./components/CourseCard";
import { Course } from "@/types/course";

export default async function CoursesPage() {
  let courses: Course[] = [];
  let error: string | null = null;

  try {
    courses = await fetchCourses();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load courses";
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Course Catalog
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Explore our collection of courses
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
            <p className="font-medium">Error loading courses</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : !error ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-zinc-900">
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
              No courses yet
            </h3>
          </div>
        ) : null}
      </div>
    </div>
  );
}
