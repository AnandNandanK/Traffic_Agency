import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import {
  CreateCampaign,
  getAllAgency,
} from "../../../../services/operations/agency";
import { ImSpinner3 } from "react-icons/im";
import type { CampaignResponse } from "../../../../interfaces/agencyInterface";

// Types
type Params = {
  clickIdKey: string;
  additionalParams: {
    key: string;
    value?: string;
  };
};

export type Campaigns<T> = {
  agencyId: number;
  name: string;
  callbackUrl: string;
  urlParams: T;
  notificationThreshold: number;
};



// Input Data
const inputData = [
  { key: "name", label: "Campaign Name", placeholder: "Enter Campaign Name" },
  {
    key: "callbackUrl",
    label: "Call Back Url",
    placeholder: "Enter Call Back Url",
  },
];

interface CampaignsCardProps {
  setCampaignData?: Dispatch<SetStateAction<CampaignResponse | null>>;
  campaignData?: CampaignResponse | null;
  popUp?: Dispatch<SetStateAction<boolean>>;
  context?: string;
  setContext?: Dispatch<SetStateAction<string>>;
}


export default function CreateCampaigns({
  setCampaignData,
  campaignData,
  popUp,
  context,
  setContext,
}: CampaignsCardProps) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("Select an agency");

  const agency = useAppSelector((state) => state.agency.data || []);

  const { loading } = useAppSelector((state) => state.agency);

  console.log("PROPS..",campaignData);

  // Form state
  const [form, setForm] = useState<Campaigns<Params>>({
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
    key: keyof Campaigns<Params>,
    value: string | number | boolean
  ) => setForm((f) => ({ ...f, [key]: value }));

  const formData = {
    ...form,
    urlParams: {
      ...form.urlParams,
      additionalParams: {
        [form.urlParams.additionalParams.key]:
          form.urlParams.additionalParams.value,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (context === "Create") {
      const res = await dispatch(CreateCampaign(formData));
      if (res) {
        popUp?.(false);
      }
      console.log("Submitting form data:", formData);
    } else if (context === "Edit") {
      console.log("Updating Campaign ID:", form);
    }
    console.log(form);
  };

  useEffect(() => {
    dispatch(getAllAgency());
  }, [dispatch]);


  
  useEffect(() => {
  if (campaignData) {
    // Get first key/value from additionalParams
    const [firstKey, firstValue] = Object.entries(
      campaignData.urlParams.additionalParams
    )[0] || ["", ""];

    setForm({
      agencyId: campaignData.agencyId ?? 0,
      name: campaignData.name ?? "",
      callbackUrl: campaignData.callbackUrl ?? "",
      urlParams: {
        clickIdKey: campaignData.urlParams.clickIdKey ?? "",
        additionalParams: {
          key: firstKey,
          value: firstValue,
        },
      },
      notificationThreshold: campaignData.notificationThreshold ?? 50,
    });

    
     const selectedAgency = agency.find(
      (a) => a.id === campaignData.agencyId
    );
    if (selectedAgency) setSelected(selectedAgency.name);
  }
}, [context, dispatch, campaignData,agency]);


  return (
    <div
      className="min-h-screen inset-0 fixed bg-black/40 p-6 z-50 
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
          {context === "Create" ? "Create Campaign" : "Update Campaign"}
        </h2>

        <div className="space-y-2 w-full relative">
          {/* Dropdown */}
          <div>

            {
              context==="Edit"?(
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Agency
            </label>
              ):(null)
            }

            


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
                {agency.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelected(option?.name);
                      setForm((prev) => ({
                        ...prev,
                        agencyId: option?.id,
                      }));
                      setOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  >
                    {option.name}
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
                  value={form[item.key as keyof Campaigns<Params>] as string}
                  onChange={(e) =>
                    handleChange(
                      item.key as keyof Campaigns<Params>,
                      e.target.value
                    )
                  }
                  placeholder={item.placeholder}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
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
                Click Id Key
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
              setContext?.("");
              setCampaignData?.(null); 
            }}
            className="px-6 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 w-3/12 h-10 py-2 flex justify-center items-center rounded-lg bg-sky-700 text-white font-semibold shadow hover:bg-sky-800"
          >
            {loading ? <ImSpinner3 className="animate-spin" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
