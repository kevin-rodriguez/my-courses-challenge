export const API_ROUTES = {
  courses: "courses",
  favorite: "favorite",
} as const;

export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES];

