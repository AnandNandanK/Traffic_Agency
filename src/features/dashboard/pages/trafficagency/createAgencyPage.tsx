import type { Dispatch } from "react";
import React, { useEffect, useState, type SetStateAction } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  CreateAgency,
  updateAgency,
} from "../../../../services/operations/agency";
import { ImSpinner3 } from "react-icons/im";
import type { AgencyData } from "./AgencyTable";
import ErrorPopup from "../../../../components/ErrorPopupPage";

type Country = {
  name: string;
  contactEmail: string;
  contactPhone: string;
};

interface AgencyCardProps {
  setAgencyData?: Dispatch<SetStateAction<AgencyData | null>>;
  agencyData?: AgencyData | null;
  popUp?: Dispatch<SetStateAction<boolean>>;
  context: string;
  setContext: Dispatch<SetStateAction<string>>;
}

export default function AgencyCUpage({
  setAgencyData,
  agencyData,
  popUp,
  context,
  setContext,
}: AgencyCardProps) {
  console.log(agencyData);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);

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
      const res = await dispatch(CreateAgency(form));

      if (res) {
        popUp?.(false);
        setForm({
          name: "",
          contactEmail: "",
          contactPhone: "",
        });
      }

      console.log(form);
      console.log(context);
    } else {
      if (agencyData?.id) {
        const res = await dispatch(updateAgency(form, agencyData?.id));
        console.log("RESPONSE..........",res)
        if (res) {
          popUp?.(false);
          setForm({
            name: "",
            contactEmail: "",
            contactPhone: "",
          });
        }
         setAgencyData?.(null); // ✅ ADD THIS LINE
    setContext("");   
      }
    }
  };

  function cancelHandler() {
    console.log("Clicked in Cancel and context is: ", context);

    if (context === "Create") {
      popUp?.(false);
    }

    setAgencyData?.(null);
    setContext("");
  }

  useEffect(() => {
    if (context === "Edit")
      setForm({
        name: agencyData?.name ?? "",
        contactEmail: agencyData?.contactEmail ?? "",
        contactPhone: agencyData?.contactPhone ?? "",
      });
  }, [agencyData, context]);

  return (
    <div
      className="min-h-screen inset-0 fixed  bg-black/40 p-6 z-50 
            flex items-center justify-center "
    >
      <ErrorPopup />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
        aria-labelledby="edit-country-title"
      >
        <h2
          id="edit-country-title"
          className="text-2xl font-extrabold text-slate-900 mb-6"
        >
          {context === "Create" ? "Create Agency" : "Update Agency"}
        </h2>

        <div className="space-y-2">
          {/* Country Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Agency Name
            </label>

            <input
              type="text"
              required={true}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Agency Name"
              //   onFocus={() => dispatch(setCountryError(null))}
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
            />
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
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
            />
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
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={cancelHandler}
            className="px-6 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            type="submit"
            className="h-10 w-3/12  rounded-lg bg-sky-700 text-white font-semibold shadow hover:bg-sky-800 flex justify-center items-center"
          >
            {loading ? <ImSpinner3 className="animate-spin" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
