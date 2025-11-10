import { createApiClient } from "./axios";

interface ApiConfig {
  baseUrl: string;
  apiVersion: string;
  email: string;
}

export function getApiConfig(): ApiConfig {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  const email = process.env.NEXT_PUBLIC_API_AUTH_EMAIL;

  if (!baseUrl || !apiVersion || !email) {
    throw new Error(
      "API configuration missing: NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_VERSION, or NEXT_PUBLIC_API_AUTH_EMAIL not set"
    );
  }

  return { baseUrl, apiVersion, email };
}

export const apiClient = createApiClient();

export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  try {
    const response = await apiClient.get<T>(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error making GET request to ${endpoint}:`, error);
    throw error;
  }
}

export async function apiPost<T>(
  endpoint: string,
  body?: unknown,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  try {
    const response = await apiClient.post<T>(endpoint, body, { params });
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error);
    throw error;
  }
}

export async function apiDelete<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  try {
    const response = await apiClient.delete<T>(endpoint, {
      data: body,
    });
    return response.data;
  } catch (error) {
    console.error(`Error making DELETE request to ${endpoint}:`, error);
    throw error;
  }
}
