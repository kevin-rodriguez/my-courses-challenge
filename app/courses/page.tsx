import { fetchCourses } from "@/lib/api/courses";
import { CoursesGrid } from "./components/CoursesGrid";
import { Course } from "@/types/course";
import { PAGE_SIZE } from "@/lib/constants";

export default async function CoursesPage() {
  let courses: Course[] = [];
  let error: string | null = null;

  try {
    courses = await fetchCourses({ limit: PAGE_SIZE, offset: 0 });
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

        {!error && <CoursesGrid courses={courses} />}
      </div>
    </div>
  );
}
