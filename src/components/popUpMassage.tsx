import { useEffect, useState } from "react";
// import {  useAppSelector } from "../store/hooks";
// import { setMassage } from "../slices/authSlice";
import { ImCross } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setErrorMsaage } from "../slices/userSlice";

export default function PopUpMessage() {
  const dispatch = useAppDispatch();


  const [hidden, setHidden] = useState(false);
  const massage = useAppSelector((state) => state.user.errorMassage);

  const clickHandler = () => {
    setHidden(true);
    dispatch(setErrorMsaage(""));
  };

  // Reset hidden whenever massage changes
  useEffect(() => {
    if (massage) {
      setHidden(false);
    }
  }, [massage]);

  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(setErrorMsaage(""));
    };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  }, []);

  return (
    <>
      {!hidden && massage && (
        <p className="bg-red-400 opacity-80 text-sm text-white my-3 py-3 px-4 rounded-sm relative hover:cursor-pointer text-center">
          {massage}
          <span
            onClick={clickHandler}
            className="absolute top-[-4px] right-[-3px] rounded-full"
          >
            <ImCross className="text-black text-[9px] font-extrabold" />
          </span>
        </p>
      )}
    </>
  );
}
