import type { Dispatch } from "react";
import React, { useEffect, useState, type SetStateAction } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";


type Vendor = {
  name: string;
};


interface VendorCardProps {
  popUp?: Dispatch<SetStateAction<boolean>>;
  context: string;
  VendorId: number;
  setContext: Dispatch<SetStateAction<string>>;
}


export default function CreateVendor({
  popUp,
  context,
  VendorId,
  setContext,
}: VendorCardProps) {


  const dispatch = useAppDispatch();

//   const countriesError = useAppSelector((state) => state.Vendor.error);
const countriesError={
    name:"",
}
//   const singleVendor = useAppSelector((state) => state.Vendor.singleVendor);

//   console.log(countriesError);

  const [form, setForm] = useState<Vendor>({
    name: ""
  });

  
  console.log(context);
  const handleChange = (key: keyof Vendor, value: string | number | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (context === "Create") {

      console.log(form);
      console.log(context);
    }
  };

//   const formData = {
//     name: form.name,
//     code: form.code,
//     phoneCode: form.phoneCode,
//   };


  useEffect(() => {
    if (context === "Edit") {
    //   dispatch(getVendorById(VendorId));
    }
  }, [context, VendorId, dispatch]);


//   useEffect(() => {
//     if (singleVendor) {
//       setForm({
//         name: singleVendor.name,
//         code: singleVendor.code,
//         phoneCode: singleVendor.phoneCode,
//         active: singleVendor.active ?? true,
//       });
//     }
//   }, [singleVendor]);


  return (
    <div
      className="min-h-screen inset-0 fixed  bg-black/40 p-6 z-50 
            flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
        aria-labelledby="edit-Vendor-title"
      >
        <h2
          id="edit-Vendor-title"
          className="text-2xl font-extrabold text-slate-900 mb-6"
        >
        {context==="Create"?("Create Vendor"):("Update Vendor")}
        </h2>

        <div className="space-y-2">
          {/* Vendor Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Vendor Name
            </label>

            <input
              type="text"
              required={true} 
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Vendor Name"
            //   onFocus={() => dispatch(setVendorError(null))}
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                countriesError?.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-200 focus:ring-sky-400"
              }`}
            />
            {countriesError?.name && (
              <p className="text-red-500 text-sm mt-1">{countriesError.name}</p>
            )}
          </div>  
        </div>


        {/* Action buttons */}
        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              popUp?.(false);
              setContext("");
            //   dispatch(setVendorError(null));
            //   dispatch(setSingleVendor(null));
            }}
            className="px-6 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-sky-700 text-white font-semibold shadow hover:bg-sky-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
