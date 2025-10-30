import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import {
  createVendor,
  updateVendor,
} from "../../../../services/operations/vendor";
import type {
  AllVendorResponse,
  Vendor,
} from "../../../../interfaces/vendorInterface";
import ErrorPopup from "../../../../components/ErrorPopupPage";

type InputField = {
  key: keyof Vendor;
  name: string;
  placeholder: string;
};

const inputData: InputField[] = [
  { key: "name", name: "Name", placeholder: "Enter Name" },
  {
    key: "redirectionUrl",
    name: "Redirection Url",
    placeholder: "Redirection Url",
  },
  { key: "contactEmail", name: "Contact Email", placeholder: "Contact Email" },
  { key: "contactPhone", name: "Contact Phone", placeholder: "Contact Phone" },
];

interface VendorCardProps {
  setVendorData?: Dispatch<SetStateAction<AllVendorResponse | null>>;
  vendorData?: AllVendorResponse;
  popUp?: Dispatch<SetStateAction<boolean>>;
  context: string;
  setContext: Dispatch<SetStateAction<string>>;
}

export default function CreateVendor({
  setVendorData,
  vendorData,
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
      additionalParams: [{ key: "", value: "" }],
    },
  });

  // ✅ Handle basic input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Add new additional param safely
  const handleAddParam = () => {
    setForm((prev) => {
      const currentParams = Array.isArray(prev.urlParams?.additionalParams)
        ? prev.urlParams?.additionalParams
        : []; // 👈 if it's an object, replace with empty array

      return {
        ...prev,
        urlParams: {
          ...prev.urlParams,
          additionalParams: [...currentParams, { key: "", value: "" }],
        },
      };
    });
  };

  const handleDeleteParam = (index: number) => {
    setForm((prev) => {
      const currentParams = Array.isArray(prev.urlParams?.additionalParams)
        ? prev.urlParams.additionalParams
        : []; // if it's an object, treat it as empty array

      return {
        ...prev,
        urlParams: {
          ...prev.urlParams,
          additionalParams: currentParams.filter((_, i) => i !== index),
        },
      };
    });
  };

  // ✅ Prepare and transform data before submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Prepare and transform data before submit
    const formData: Vendor = {
      ...form,
      urlParams: {
        clickIdKey: form.urlParams?.clickIdKey || "",
        additionalParams: Array.isArray(form.urlParams?.additionalParams)
          ? form.urlParams.additionalParams.reduce((acc, { key, value }) => {
              if (key) acc[key] = value || "";
              return acc;
            }, {} as Record<string, string>)
          : form.urlParams?.additionalParams || {},
      },
    };

    if (context === "Create") {
      const res = await dispatch(createVendor(formData));
      if (res) {
        popUp?.(false);
      }
    } else if (context === "Edit") {
      if (vendorData?.id) {
        const res = await dispatch(updateVendor(formData, vendorData.id));
        if (res) {
          setVendorData?.(null);
          setContext?.("");
        }
      }
    }
  };

  // ✅ Fill form in Edit mode
  useEffect(() => {
    if (context === "Edit" && vendorData) {
      const additionalParamsArray = vendorData?.requiredParams?.additionalParams
        ? Object.entries(vendorData.requiredParams.additionalParams).map(
            ([key, value]) => ({ key, value })
          )
        : [{ key: "", value: "" }];

      setForm({
        name: vendorData.name ?? "",
        redirectionUrl: vendorData.redirectionUrl ?? "",
        contactEmail: vendorData.contactEmail ?? "",
        contactPhone: vendorData.contactPhone ?? "",
        urlParams: {
          clickIdKey: vendorData.requiredParams?.clickIdKey || "",
          additionalParams: additionalParamsArray,
        },
      });
    }
  }, [context, vendorData]);

  return (
    <div className="min-h-screen inset-0 fixed bg-black/40 p-6 z-50 flex items-center justify-center">
      <ErrorPopup />
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

        {/* 🔹 Basic Fields */}
        <div className="space-y-2">
          {inputData.map((item) => (
            <div key={item.key}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {item.name}
              </label>
              <input
                type="text"
                name={item.key}
                value={(form[item.key] as string | number) ?? ""}
                onChange={handleChange}
                placeholder={item.placeholder}
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
              />
            </div>
          ))}

          {/* 🔹 Url Params */}
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
                value={form.urlParams?.clickIdKey || ""}
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

              {Array.isArray(form.urlParams?.additionalParams) &&
                form.urlParams.additionalParams.map((param, index) => {
                  const paramsArray = form.urlParams!.additionalParams as {
                    key: string;
                    value: string;
                  }[];

                  return (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Key"
                        value={param.key}
                        onChange={(e) => {
                          const updated = [...paramsArray];
                          updated[index].key = e.target.value;
                          setForm((f) => ({
                            ...f,
                            urlParams: {
                              ...f.urlParams,
                              additionalParams: updated,
                            },
                          }));
                        }}
                        className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={param.value}
                        onChange={(e) => {
                          const updated = [...paramsArray];
                          updated[index].value = e.target.value;
                          setForm((f) => ({
                            ...f,
                            urlParams: {
                              ...f.urlParams,
                              additionalParams: updated,
                            },
                          }));
                        }}
                        className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 border-slate-200 focus:ring-sky-400"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteParam(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}

              <button
                type="button"
                onClick={handleAddParam}
                className="mt-2 px-4 py-2  text-blue-500 font-bold rounded-lg"
              >
                + Add More
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Buttons */}
        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              popUp?.(false);
              setContext("");
              setVendorData?.(null);
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
