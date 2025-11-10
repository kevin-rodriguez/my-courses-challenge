import axios, { AxiosInstance, AxiosResponse } from "axios";
import { camelizeKeys } from "humps";

import { getApiConfig } from "./client";

export function createApiClient(): AxiosInstance {
  const { baseUrl, apiVersion, email } = getApiConfig();

  const client = axios.create({
    baseURL: `${baseUrl}/${apiVersion}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "", // Empty Accept header as required by the API
    },
  });

  // Add request interceptor to automatically include email parameter
  client.interceptors.request.use((config) => {
    if (!config.params) {
      config.params = {};
    }
    config.params.email = email;
    return config;
  });

  client.interceptors.response.use((response: AxiosResponse) => {
    if (response.data) {
      response.data = camelizeKeys(response.data);
    }
    return response;
  });

  return client;
}
