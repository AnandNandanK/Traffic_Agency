import type { Dispatch } from "react";
import React, { useEffect, useState, type SetStateAction } from "react";

import { useAppDispatch } from "../../../../store/hooks";
import { createVendor } from "../../../../services/operations/vendor";
import type { Vendor } from "../../../../interfaces/vendorInterface";
import Slider from "@mui/material/Slider";
import ErrorPopup from "../../../../components/ErrorPopupPage";


type InputField = {
  key: keyof Vendor;
  name: string;
  placeholder: string;
};


const inputData: InputField[] = [
  { key: "name", name: "Name", placeholder: "Enter Name" },
  { key: "redirectionUrl", name: "Redirection Url", placeholder: "Redirection Url" },
  { key: "contactEmail", name: "Contact Email", placeholder: "Contact Email" },
  { key: "contactPhone", name: "Contact Phone", placeholder: "Contact Phone" },
];


interface VendorCardProps {
  popUp?: Dispatch<SetStateAction<boolean>>;
  context: string;
  setContext: Dispatch<SetStateAction<string>>;
}


//...........................................TSX Start.................................................
export default function CreateVendor({
  popUp,
  context,
  setContext,
}: VendorCardProps) {
  const dispatch = useAppDispatch();



  

  const [form, setForm] = useState<Vendor>({
    name: "",
    redirectionUrl: "",
    contactEmail: "",
    contactPhone: "",
    urlParams: {
      clickIdKey: "",
      additionalParams: {
        key: "",
      },
    },
    dailyLimit: 0, 
  });



const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({
    ...form,                        // keep previous values
    [e.target.name]: e.target.value // update the field being edited
  });
};


  console.log(context);



const formData: Vendor = {
  name: form.name,
  redirectionUrl: form.redirectionUrl,
  contactEmail: form.contactEmail,
  contactPhone: form.contactPhone,
  dailyLimit: form.dailyLimit,
  urlParams: {
    clickIdKey: form.urlParams?.clickIdKey || "",  // ✅ default to empty string
    additionalParams: {
      [form.urlParams?.additionalParams?.key as string]:
        form.urlParams?.additionalParams?.value || "", // default empty string
    },
  },
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (context === "Create") {
      const res = await dispatch(createVendor(formData));

      if (res) {
        popUp?.(false);
      }

      console.log(formData);
      console.log(context);
    }
  };


  useEffect(() => {
    if (context === "Edit") {
      //   dispatch(getVendorById(VendorId));
    }
  }, [context, dispatch]);


  return (
    <div
      className="min-h-screen inset-0 fixed  bg-black/40 p-6 z-50 
            flex items-center justify-center"
    >
      <ErrorPopup/>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
        aria-labelledby="edit-Vendor-title"
      >
        <h2
          id="edit-Vendor-title"
          className="text-2xl font-extrabold text-slate-900 mb-6"
        >
          {context === "Create" ? "Create Vendor" : "Update Vendor"}
        </h2>

        <div className="space-y-2">
          {/* Vendor Name */}
        
            {
              inputData.map((item)=>{
                return (
                    <div key={item.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {item.name}
                    </label>

                    <input
                      type="text"
                      required={true}
                      name={item.key}
                     value={(form[item.key] as string | number) ?? ""}
                      onChange={(e) => handleChange(e)}
                      placeholder={item.placeholder}
                      //   onFocus={() => dispatch(setVendorError(null))}
                      className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 
                              border-slate-200 focus:ring-sky-400"
                    />
                 </div>

                )
              })
            }



             {/* Url Params Section */}
          <div className="p-3 border-slate-200 border-4 rounded-2xl space-y-3.5">
            <label className="block text-sm font-medium text-black mb-2 text-center uppercase">
              Url Params
            </label>

            {/* Click Id */}
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 text-left w-28">
                Click Id Key
              </label>
              <input
                type="text"
                value={form?.urlParams?.clickIdKey}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    urlParams: { ...f.urlParams, clickIdKey: e.target.value },
                  }))
                }
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
              />
            </div>


            {/* Additional Params */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional Params
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={form.urlParams?.additionalParams?.key}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      urlParams: {
                        ...f.urlParams,
                        additionalParams: {
                          ...f.urlParams?.additionalParams,
                          key: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
                />

                <input
                  type="text"
                  placeholder="Value"
                  value={form?.urlParams?.additionalParams?.value}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      urlParams: {
                        ...f.urlParams,
                        additionalParams: {
                          ...f?.urlParams?.additionalParams,
                          value: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
                />
              </div>
            </div>
          </div>


          {/* Slider */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notification Threshold
            </label>
            <Slider
              value={form.dailyLimit}
              onChange={(_, value) =>
                setForm((f) => ({
                  ...f,
                  dailyLimit: value as number,
                }))
              }
              aria-label="Notification Threshold"
              valueLabelDisplay="auto"
            />
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
