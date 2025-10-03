
import axios from "axios";
import type { Common } from "../../interfaces/commonInterface";

import { apiConnector } from "../apiConnetor";
const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;



export function createVendor(name:string) {
  return async (): Promise<boolean> => {
    try {
    //   dispatch(setAgencyLoading(true));

      const response = await apiConnector<Common<null>>({
        method: "POST",
        url:`${BASE_URL}/api/v1/vendors/create`,
        bodyData: {name},
        headers: {
          "X-Client-Source": "WEB",
        },
        withCredentials: true,
      });

      console.log("CREATE VENDOR RESPONSE:", response.data);

      if (response.data.statusCode === 201) {
        // ✅ Success case
        // dispatch(getAllCountries());
        return true; // <--- return success
      }

      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
     
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
    //   dispatch(setAgencyLoading(false));
    }
  };
}
