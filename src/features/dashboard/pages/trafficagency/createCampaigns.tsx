import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import {
  CreateCampaign,
  getAllAgency,
  updateCampaign,
} from "../../../../services/operations/agency";
import { ImSpinner3 } from "react-icons/im";
import type { CampaignResponse } from "../../../../interfaces/agencyInterface";
import ErrorPopup from "../../../../components/ErrorPopupPage";

type AdditionalParam = { key: string; value?: string };

type Params = {
  clickIdKey: string;
  additionalParams: AdditionalParam[];
};

export type Campaigns<T> = {
  agencyId: number;
  name: string;
  callbackUrl: string;
  urlParams: T;
  notificationThreshold: number;
};

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

  const agency = useAppSelector((state) => state.agency.data?.list || []);
  const { loading } = useAppSelector((state) => state.agency);

  // Form state
  const [form, setForm] = useState<Campaigns<Params>>({
    agencyId: 0,
    name: "",
    callbackUrl: "",
    urlParams: {
      clickIdKey: "",
      additionalParams: [{ key: "", value: "" }],
    },
    notificationThreshold: 0,
  });

  const handleChange = (
    key: keyof Campaigns<Params>,
    value: string | number | boolean
  ) => setForm((f) => ({ ...f, [key]: value }));

  // ✅ Convert array → object before submitting
  const formData = {
    ...form,
    urlParams: {
      ...form.urlParams,
      additionalParams: form.urlParams.additionalParams.reduce(
        (acc, { key, value }) => {
          if (key) acc[key] = value || "";
          return acc;
        },
        {} as Record<string, string>
      ),
    },
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (context === "Create") {
      const res = await dispatch(CreateCampaign(formData));
      if (res) {
        popUp?.(false);
      setContext?.("");

      }
      console.log("Submitting form data:", formData);
    } else if (context === "Edit") {
      if (campaignData?.id) {
        const res = await dispatch(updateCampaign(formData, campaignData?.id));
        if (res) {
          popUp?.(false);
          setCampaignData?.(null);
          setContext?.("");
        }
      }

      console.log("Updating Campaign ID:", form);
    }
  };

  useEffect(() => {
    dispatch(getAllAgency());
  }, [dispatch]);

  // ✅ Prefill in edit mode
  useEffect(() => {
    if (campaignData) {
      const additionalArray = Object.entries(
        campaignData.urlParams.additionalParams || {}
      ).map(([key, value]) => ({ key, value }));

      setForm({
        agencyId: campaignData.agencyId ?? 0,
        name: campaignData.name ?? "",
        callbackUrl: campaignData.callbackUrl ?? "",
        urlParams: {
          clickIdKey: campaignData.urlParams.clickIdKey ?? "",
          additionalParams: additionalArray.length
            ? additionalArray
            : [{ key: "", value: "" }],
        },
        notificationThreshold: campaignData.notificationThreshold ?? 50,
      });

      const selectedAgency = agency.find((a) => a.id === campaignData.agencyId);
      if (selectedAgency) setSelected(selectedAgency.name);
    }
  }, [context, dispatch, campaignData, agency]);

  // ✅ Add / Remove Params
  const addParam = () =>
    setForm((f) => ({
      ...f,
      urlParams: {
        ...f.urlParams,
        additionalParams: [
          ...f.urlParams.additionalParams,
          { key: "", value: "" },
        ],
      },
    }));

  const removeParam = (index: number) =>
    setForm((f) => ({
      ...f,
      urlParams: {
        ...f.urlParams,
        additionalParams: f.urlParams.additionalParams.filter(
          (_, i) => i !== index
        ),
      },
    }));

  return (
    <div className="min-h-screen inset-0 fixed bg-black/40 p-6 z-50 flex items-center justify-center">
      <ErrorPopup />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
      >
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
          {context === "Create" ? "Create Campaign" : "Update Campaign"}
        </h2>

        {/* Agency Dropdown */}
        <div className="space-y-2 w-full relative">
          {context === "Edit" && (
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Agency
            </label>
          )}
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition"
          >
            {selected}
            <MdOutlineArrowDropDownCircle
              className={`w-5 h-5 transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {open && (
            <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              {agency.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelected(option?.name);
                    setForm((prev) => ({ ...prev, agencyId: option?.id }));
                    setOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-sky-100 hover:text-sky-600"
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Inputs */}
        {inputData.map((item, index) => (
          <div key={index} className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {item.label}
            </label>
            <input
              type="text"
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
        ))}

        {/* URL Params */}
        <div className="p-3 mt-4 border-slate-200 border-4 rounded-2xl space-y-3.5">
          <label className="block text-sm font-medium text-black mb-2 text-center uppercase">
            Url Params
          </label>

          {/* Click ID Key */}
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-slate-700 w-28">
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
            {form.urlParams.additionalParams.map((param, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={param.key}
                  onChange={(e) => {
                    const updated = [...form.urlParams.additionalParams];
                    updated[index].key = e.target.value;
                    setForm((f) => ({
                      ...f,
                      urlParams: { ...f.urlParams, additionalParams: updated },
                    }));
                  }}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={param.value}
                  onChange={(e) => {
                    const updated = [...form.urlParams.additionalParams];
                    updated[index].value = e.target.value;
                    setForm((f) => ({
                      ...f,
                      urlParams: { ...f.urlParams, additionalParams: updated },
                    }));
                  }}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
                />
                <button
                  type="button"
                  onClick={() => removeParam(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addParam}
              className="mt-2 text-sky-600 font-medium"
            >
              + Add More
            </button>
          </div>
        </div>

        {/* Threshold */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Notification Threshold
          </label>
          <input
            type="number"
            value={form.notificationThreshold}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                notificationThreshold: Number(e.target.value),
              }))
            }
            placeholder="Enter Click Count"
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
          />
        </div>

        {/* Action Buttons */}
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
