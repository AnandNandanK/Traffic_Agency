import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setErrorMsaage } from "../slices/userSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ErrorPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const errorMsg = useAppSelector((state) => state.user.errorMassage);

  // agar error message nahi hai, popup bilkul render hi nahi hoga
  if (!errorMsg) return null;

  const handleClose = () => {
    dispatch(setErrorMsaage(null)); // ✅ Redux se error clear
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="
          bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative
          animate-fadeIn
        "
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineCloseCircle size={22} />
        </button>

        <h2 className="text-xl font-bold text-red-600 mb-3">Error</h2>
        <p className="text-gray-700">{errorMsg}</p>

        <div className="mt-5 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
