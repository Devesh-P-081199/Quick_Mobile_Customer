import axios from "axios";
import Cookies from "js-cookie";
const ACCESS_TOKEN_STORAGE_KEY = "quickmobile_access_token";
const REFRESH_TOKEN_STORAGE_KEY = "quickmobile_refresh_token";

const canUseStorage = () => typeof window !== "undefined";

const readStoredToken = (key) => {
  if (!canUseStorage()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStoredToken = (key, value) => {
  if (!canUseStorage()) return;
  try {
    if (value) {
      localStorage.setItem(key, value);
      return;
    }
    localStorage.removeItem(key);
  } catch {
    // no-op
  }
};

const isAuthenticatedUserCookiePresent = () => {
  const rawUser = Cookies.get("user");
  if (!rawUser) return false;

  try {
    const parsedUser = JSON.parse(rawUser);
    return Boolean(
      parsedUser?.userId ||
      parsedUser?._id ||
      parsedUser?.phone ||
      parsedUser?.email,
    );
  } catch {
    return false;
  }
};

export const getStoredAuthTokens = () => ({
  accessToken: readStoredToken(ACCESS_TOKEN_STORAGE_KEY),
  refreshToken: readStoredToken(REFRESH_TOKEN_STORAGE_KEY),
});

export const setStoredAuthTokens = ({ accessToken, refreshToken } = {}) => {
  writeStoredToken(ACCESS_TOKEN_STORAGE_KEY, accessToken || null);
  writeStoredToken(REFRESH_TOKEN_STORAGE_KEY, refreshToken || null);
};

const clearStoredAuthTokens = () => {
  writeStoredToken(ACCESS_TOKEN_STORAGE_KEY, null);
  writeStoredToken(REFRESH_TOKEN_STORAGE_KEY, null);
};

export const clearAuthSession = () => {
  clearStoredAuthTokens();
  Cookies.remove("user");
  Cookies.remove("userSelection");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const extractTokenPayload = (responseData) => {
  if (!responseData || typeof responseData !== "object") {
    return {};
  }

  if (responseData.tokens && typeof responseData.tokens === "object") {
    return responseData.tokens;
  }

  return {
    accessToken: responseData.accessToken,
    refreshToken: responseData.refreshToken,
  };
};

const persistTokensFromResponse = (responseData) => {
  const tokenPayload = extractTokenPayload(responseData);
  if (!tokenPayload?.accessToken && !tokenPayload?.refreshToken) {
    return;
  }

  const existingTokens = getStoredAuthTokens();
  setStoredAuthTokens({
    accessToken: tokenPayload.accessToken || existingTokens.accessToken,
    refreshToken: tokenPayload.refreshToken || existingTokens.refreshToken,
  });
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  if (!isAuthenticatedUserCookiePresent()) {
    return config;
  }

  const { accessToken } = getStoredAuthTokens();
  if (accessToken) {
    config.headers = config.headers || {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    persistTokensFromResponse(response?.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Catch 503 Service Unavailable (system under maintenance)
    if (error.response?.status === 503) {
      sessionStorage.setItem("api_maintenance", "true");
      window.dispatchEvent(new CustomEvent("api:maintenance"));
    }
    const isRefreshRequest = originalRequest?.url?.includes(
      "/sell-module/user/refresh-token",
    );
    const shouldAttemptRefresh = isAuthenticatedUserCookiePresent();

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isRefreshRequest &&
      shouldAttemptRefresh
    ) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = getStoredAuthTokens();
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/sell-module/user/refresh-token`,
          refreshToken ? { refreshToken } : {},
          { withCredentials: true },
        );

        persistTokensFromResponse(refreshResponse?.data);
        const latestAccessToken = getStoredAuthTokens().accessToken;

        if (latestAccessToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${latestAccessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthSession();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:session-expired"));
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
