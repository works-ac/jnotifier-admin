import axios from "axios";
import { AppVariables } from "../app/AppVariables";
import { refreshToken, clearCookies } from "../services/SignupService";
import axiosRetry from "axios-retry";

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

axiosRetry(apiClient, {
  retries: 3, // Maximum 3 retry attempts before throwing error

  // Condition: Only retry when status code is 429 or during unexpected network failures
  retryCondition: (error) => {
    return error.response?.status === 429 || axiosRetry.isNetworkError(error);
  },

  // Calculate wait duration based on server response headers
  retryDelay: (retryCount, error) => {
    const headers = error.response?.headers;

    if (headers) {
      // Check standard 'retry-after' or fallback to custom 'request-after' header
      const headerVal = headers["retry-after"] || headers["request-after"];

      if (headerVal) {
        // Parse header value (can be seconds as a string "1" or an HTTP Date string)
        const delaySeconds = isNaN(headerVal)
          ? (new Date(headerVal).getTime() - Date.now()) / 1000
          : parseFloat(headerVal);

        if (delaySeconds > 0) {
          // Add a 100ms safety buffer to guarantee the bucket token refilled
          return delaySeconds * 1000 + 100;
        }
      }
    }

    // Fallback: Exponential Backoff with Jitter if headers are missing
    // 1st retry ~1s-1.2s, 2nd retry ~2s-2.2s, 3rd retry ~4s-4.2s
    const baseDelay = Math.pow(2, retryCount - 1) * 1000;
    const jitter = Math.random() * 200;
    return baseDelay + jitter;
  },

  // Hook for logging and debugging retries in development
  onRetry: (retryCount, error, requestConfig) => {
    const waitTime =
      error.response?.headers["retry-after"] ||
      error.response?.headers["request-after"];
    console.warn(
      `[HTTP 429] Rate limit hit on ${requestConfig.url}. Retrying attempt #${retryCount} after ${waitTime || "calculated"}s...`,
    );
  },
});

export default apiClient;
