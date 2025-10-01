import type { Dispatch } from "react";
import React, { useEffect, useState, type SetStateAction } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";


type Country = {
  name: string;
  contactEmail:string;
  contactPhone:string;
};


interface CountryCardProps {
  popUp?: Dispatch<SetStateAction<boolean>>;
  context: string;
  countryId: number;
  setContext: Dispatch<SetStateAction<string>>;
}


export default function AgencyCUpage({
  popUp,
  context,
  countryId,
  setContext,
}: CountryCardProps) {


  const dispatch = useAppDispatch();

//   const countriesError = useAppSelector((state) => state.country.error);
const countriesError={
    name:"",
    contactEmail:"",
    contactPhone:""
}
//   const singleCountry = useAppSelector((state) => state.country.singleCountry);

//   console.log(countriesError);

  const [form, setForm] = useState<Country>({
    name: "",
    contactEmail: "",
    contactPhone: "",
  });

  console.log(context);
  const handleChange = (key: keyof Country, value: string | number | boolean) =>
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
    //   dispatch(getCountryById(countryId));
    }
  }, [context, countryId, dispatch]);


//   useEffect(() => {
//     if (singleCountry) {
//       setForm({
//         name: singleCountry.name,
//         code: singleCountry.code,
//         phoneCode: singleCountry.phoneCode,
//         active: singleCountry.active ?? true,
//       });
//     }
//   }, [singleCountry]);

  return (
    <div
      className="min-h-screen inset-0 fixed  bg-black/40 p-6 z-50 
            flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
        aria-labelledby="edit-country-title"
      >
        <h2
          id="edit-country-title"
          className="text-2xl font-extrabold text-slate-900 mb-6"
        >
        {context==="Create"?("Create Agency"):("Update Agency")}
        </h2>

        <div className="space-y-2">
          {/* Country Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Country Name
            </label>

            <input
              type="text"
              required={true} 
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Country Name"
            //   onFocus={() => dispatch(setCountryError(null))}
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

         
            {/* ISO Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contact Email
              </label>
              <input
                type="text"
                value={form.contactEmail}
                // onFocus={() => dispatch(setCountryError(null))}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                placeholder="Enter Contact Email"
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                  countriesError?.contactEmail
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-200 focus:ring-sky-400"
                }`}
              />
              {countriesError?.contactEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {countriesError.contactEmail}
                </p>
              )}
            </div>
          

            {/* ISO Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
               Contact Phone
              </label>
              <input
                type="text"
                value={form.contactPhone}
                // onFocus={() => dispatch(setCountryError(null))}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                placeholder="Enter Contact Phone"
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                  countriesError?.contactPhone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-200 focus:ring-sky-400"
                }`}
              />
              {countriesError?.contactPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {countriesError.contactPhone}
                </p>
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
            //   dispatch(setCountryError(null));
            //   dispatch(setSingleCountry(null));
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
