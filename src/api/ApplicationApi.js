import axios from "axios";
import { AppVariables } from "../app/AppVariables";
import { refreshToken, clearCookies } from "../services/SignupService";

// 2. Initialize Axios Client
const apiClient = axios.create({
  baseURL: AppVariables.API_BASE_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Sorry, there's a problem connecting to our server right now, please try again!!!",
  withCredentials: true, // Crucial: Ensures cookies are sent with every request
});

// Queue management for parallel requests during a refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // No token needs to be passed down since it's handled by cookies
      prom.resolve();
    }
  });
  failedQueue = [];
};

// 3. Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403) {
      if (
        error.response?.data?.error?.code === "TOKEN_REFRESH_EXPIRED" ||
        error.response?.data?.error?.code === "TOKEN_REFRESH_ERROR"
      ) {
        try {
          await clearCookies();
        } catch {}

        globalThis.location.href = "/account";
        return Promise.reject(error);
      }

      // Check for 403 and ensure we haven't already retried this request
      if (!originalRequest._retry && !originalRequest.url.includes("/clear")) {
        if (isRefreshing) {
          // Queue the request until the refresh completes
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              // Once resolved, retry the request. The browser will automatically attach the new cookie.
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Call your refresh token API
          await refreshToken();

          // The API response sets the new cookie automatically.
          // We just need to process the queue and retry the original request.
          processQueue(null);
          return apiClient(originalRequest);
        } catch (refreshError) {
          // If the refresh token api fails (e.g., refresh token is also expired)
          processQueue(refreshError);

          // Redirect to login or emit a logout event
          globalThis.location.href = "/account";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
