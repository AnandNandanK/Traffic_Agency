import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setErrorMsaage } from "../slices/userSlice";

export default function PopUpMessage() {
  const dispatch = useAppDispatch();
  const [hidden, setHidden] = useState(false);
  const message = useAppSelector((state) => state.user.errorMassage);

  const clickHandler = () => {
    setHidden(true);
    dispatch(setErrorMsaage(""));
  };

  // Reset hidden whenever message changes
  useEffect(() => {
    if (message) setHidden(false);
  }, [message]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(setErrorMsaage(""));
    };
  }, [dispatch]);

  if (!message || hidden) return null;

  return (
    <div
      className="
        fixed top-5 right-5 z-[9999]
        bg-red-500 text-white text-sm 
        py-3 px-4 rounded-md shadow-lg 
        flex items-center gap-2
        animate-fadeIn
      "
      style={{ pointerEvents: "auto" }}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={clickHandler}
        className="text-black bg-white rounded-full p-1 hover:bg-gray-200"
      >POP UP MASSAGE
        <ImCross className="text-[10px] font-extrabold" />
      </button>
    </div>
  );
}
