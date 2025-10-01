import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useAppDispatch } from "../../../../store/hooks";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

// Types
type Params = {
  clickIdKey: string;
  additionalParams: {
    key: string;
    value?: string;
  };
};

type Campaigns = {
  agencyId: number;
  name: string;
  callbackUrl: string;
  urlParams: Params;
  notificationThreshold: number;
};

interface CampaignsCardProps {
  popUp?: Dispatch<SetStateAction<boolean>>;
  context: string;
  CampaignsId: number;
  setContext: Dispatch<SetStateAction<string>>;
}

// Input Data
const inputData = [
  { key: "name", label: "Agency Name", placeholder: "Enter Agency Name" },
  {
    key: "callbackUrl",
    label: "Call Back Url",
    placeholder: "Enter Call Back Url",
  },
];

const options = ["India", "USA", "Canada", "Australia", "Germany"];

export default function CreateCampaigns({
  popUp,
  context,
  CampaignsId,
  setContext,
}: CampaignsCardProps) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select an agency");

  
  // Error state typed safely
  const [countriesError, setCountriesError] = useState<
    Partial<Record<keyof Campaigns, string>>
  >({});

  // Form state
  const [form, setForm] = useState<Campaigns>({
    agencyId: 0,
    name: "",
    callbackUrl: "",
    urlParams: {
      clickIdKey: "",
      additionalParams: {
        key: "",
        value: "",
      },
    },
    notificationThreshold: 50,
  });


  const handleChange = (
    key: keyof Campaigns,
    value: string | number | boolean
  ) => setForm((f) => ({ ...f, [key]: value }));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (context === "Create") {
      console.log("Submitting form data:", form);
    } else if (context === "Edit") {
      console.log("Updating Campaign ID:", CampaignsId, form);
    }

    console.log(form)
  };

  useEffect(() => {
    if (context === "Edit") {
      // dispatch(getCampaignsById(CampaignsId));
    }
  }, [context, CampaignsId, dispatch]);

  return (

    <div
      className="min-h-screen inset-0 fixed backdrop-blur-2xl p-6 z-50 
            flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
        aria-labelledby="edit-Campaigns-title"
      >
        <h2
          id="edit-Campaigns-title"
          className="text-2xl font-extrabold text-slate-900 mb-6"
        >
          {context === "Create" ? "Create Agency" : "Update Agency"}
        </h2>

        <div className="space-y-2 w-full relative">
          {/* Dropdown */}
          <div>
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-200"
            >
              {selected}
              <MdOutlineArrowDropDownCircle
                className={`w-5 h-5 transform transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {open && (
              <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 animate-fadeIn">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Text Inputs */}
          {inputData.map((item, index) => {
            return (
              <div key={index}>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {item.label}
                </label>

                <input
                  type="text"
                  required
                  value={form[item.key as keyof Campaigns] as string}

                  onChange={(e) =>
                    handleChange(item.key as keyof Campaigns, e.target.value)
                  }
                  placeholder={item.placeholder}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                    countriesError?.[item.key as keyof Campaigns]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-200 focus:ring-sky-400"
                  }`}
                />
              </div>
            );
          })}


          {/* Url Params Section */}
          <div className="p-3 border-slate-200 border-4 rounded-2xl space-y-3.5">
            <label className="block text-sm font-medium text-black mb-2 text-center uppercase">
              Url Params
            </label>

            {/* Click Id */}
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 text-left w-28">
                Click Id
              </label>
              <input
                type="text"
                value={form.urlParams.clickIdKey}
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
                  value={form.urlParams.additionalParams.key}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      urlParams: {
                        ...f.urlParams,
                        additionalParams: {
                          ...f.urlParams.additionalParams,
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
                  value={form.urlParams.additionalParams.value}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      urlParams: {
                        ...f.urlParams,
                        additionalParams: {
                          ...f.urlParams.additionalParams,
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
              value={form.notificationThreshold}
              onChange={(_, value) =>
                setForm((f) => ({
                  ...f,
                  notificationThreshold: value as number,
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
              setForm({
                agencyId: 0,
                name: "",
                callbackUrl: "",
                urlParams: { clickIdKey: "", additionalParams: { key: "", value: "" } },
                notificationThreshold: 50,
              });
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
