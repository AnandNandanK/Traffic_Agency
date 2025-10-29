import axios from "axios";
import { store } from "../store/store";
import { clearUser, setLoading } from "../slices/userSlice";
import { NavigateTo } from "../utils/navigationHelper";

const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

export const axiosInstance = axios.create({
  // baseURL: "https://yourapi.com", optional
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await axios.post(`${BASE_URL}/api/v1/auth/logout`, {}, { withCredentials: true });
        store.dispatch(setLoading(true));
        store.dispatch(clearUser());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
          NavigateTo("/routing-dashboard/login");
      } catch (logoutError) {
        console.error("Logout failed:", logoutError);
      } finally {
        store.dispatch(setLoading(false));
      }
    }
    return Promise.reject(error);
  }
);