// //SING IN 

import type { NavigateFunction } from "react-router";
import { clearUser, setErrorMsaage, setLoading, setUser } from "../../slices/userSlice";
import type { AppDispatch } from "../../store/store";
import { apiConnector } from "../apiConnetor";
import { isAxiosError } from "axios";
const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

console.log("BASE URL..", BASE_URL)

interface FormItems {
    userEmail: string,
    password: string
}


export function signIn(
    formData: FormItems,
    navigate: NavigateFunction,
) {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(setLoading(true));
            const response = await apiConnector<{
                message: string;
                statusCode: number;
                data: {
                    id: number
                };
            }>({
                method: "POST",
                url: `${BASE_URL}/api/v1/auth/login`,
                bodyData: formData,
                withCredentials: true,
            });

            const data = response.data;
            console.log("LOGIN API RESPONSE............", data);

            if (data.statusCode === 200) {
                localStorage.setItem("user", JSON.stringify(response.data.data.id));
                navigate("/dashboard");
                dispatch(setUser(response.data.data))
            }

        } catch (error) {
            if (isAxiosError(error)) {   // ⬅ use isAxiosError directly
                dispatch(setErrorMsaage(error.response?.data?.message || "Login failed"));
                console.log("LOGIN API ERROR RESPONSE............", error);
            } else {
                console.log("LOGIN ERROR............", "An unknown error occurred.");
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
}



export function logout(
    navigate: NavigateFunction
) {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {

            const response = await apiConnector<{
                message: string;
                statusCode: number;
                data: {
                    id: number
                };
            }>({
                method: "POST",
                url: `${BASE_URL}/api/v1/auth/logout`,
                withCredentials: true,
            });

            console.log(response);

            dispatch(setLoading(true));
            localStorage.removeItem("user");
            dispatch(clearUser());
            navigate("/login");

            console.log("LOGGING OUT...")
        } catch (error) {
            if (isAxiosError(error)) {   // ⬅ use isAxiosError directly
                dispatch(setErrorMsaage(error.response?.data?.message || "Login failed"));
                console.log("LOGIN API ERROR RESPONSE............", error);
            } else {
                console.log("LOGIN ERROR............", "An unknown error occurred.");
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
}






