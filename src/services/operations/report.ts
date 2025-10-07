import axios from "axios";
import type { Common } from "../../interfaces/commonInterface";
import type { Traffic } from "../../interfaces/report";
import type { AppDispatch } from "../../store/store";
import { apiConnector } from "../apiConnetor";
import { setErrorMsaage } from "../../slices/userSlice";
import { setReport } from "../../slices/reportSlice";
const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;


export function getAllReport(page:number=0) {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      // dispatch(setLoading(true));

      const response = await apiConnector<Common<Traffic[]>>({
        method: "GET",
        url:`${BASE_URL}/api/v1/trafficagencies/campaigns/report?page=${page}`,
        withCredentials: true,
      });

      console.log("ALL REPORTS RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(setReport(response.data.data));
        return true; // <--- return success
      }

      return false; // if not scuccess

    } catch (error) {
      if (axios.isAxiosError(error)) {
      dispatch(setErrorMsaage(error.response?.data?.message))
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
      // dispatch(setLoading(false));
    }
  };
}

