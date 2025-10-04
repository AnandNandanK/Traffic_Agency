
import axios from "axios";
import type { Common } from "../../interfaces/commonInterface";

import { apiConnector } from "../apiConnetor";
import type { Vendor } from "../../interfaces/vendorInterface";
import { setErrorMsaage } from "../../slices/userSlice";
import type { AppDispatch } from "../../store/store";
const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;







export function createVendor(formData:Vendor) {
  return async (dispatch:AppDispatch): Promise<boolean> => {
    try {
    //   dispatch(setAgencyLoading(true));

      const response = await apiConnector<Common<null>>({
        method: "POST",
        url:`${BASE_URL}/api/v1/vendors/create`,
        bodyData: formData,
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
      dispatch(setErrorMsaage(error.response?.data?.message))
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
