
import axios from "axios";
import type { Common} from "../../interfaces/commonInterface";

import { apiConnector } from "../apiConnetor";
import type { AllVendorResponse, Vendor } from "../../interfaces/vendorInterface";
import { setErrorMsaage } from "../../slices/userSlice";
import type { AppDispatch } from "../../store/store";
import { setVendor } from "../../slices/vendorSlice";
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
        dispatch(getAllVendor());
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



export function updateVendor(formData:Vendor,id:number) {
  return async (dispatch:AppDispatch): Promise<boolean> => {
    try {
    //   dispatch(setAgencyLoading(true));

      const response = await apiConnector<Common<null>>({
        method: "PATCH",
        url:`${BASE_URL}/api/v1/vendors/update/${id}`,
        bodyData: formData,
        withCredentials: true,
      });

      console.log("UPDATE VENDOR RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(getAllVendor());
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





export function getAllVendor(page:number=0) {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      // dispatch(setLoading(true));

      const response = await apiConnector<Common<AllVendorResponse[]>>({
        method: "GET",
        url:`${BASE_URL}/api/v1/vendors/list?page=${page}`,
        withCredentials: true,
      });

      console.log("ALL VENDOR RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(setVendor(response.data.data));
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

