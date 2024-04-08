import axios, { AxiosResponse, Method } from "axios";

const BASE_URL = "http://127.0.0.1:5000";

async function apiRequest(
  method: Method,
  endpoint: string,
  data?: object
): Promise<AxiosResponse["data"]> {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const url = `${BASE_URL}${endpoint}`;
    const options = {
      method,
      url,
      headers,
      ...(method === "get" ? {} : { data }), // Only include data for non-GET requests
    };
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

export default apiRequest;

export const createPost = (data: object) =>
  apiRequest("POST", "/api/posts", data);
export const getPosts = () => apiRequest("GET", "/api/posts");
export const updatePost = (id: string, data: object) =>
  apiRequest("PUT", `/api/posts/${id}`, data);
export const deletePost = (id: string) =>
  apiRequest("DELETE", `/api/posts/${id}`);
