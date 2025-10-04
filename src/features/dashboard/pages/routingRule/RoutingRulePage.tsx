import type { Dispatch } from "react";
import React, { useState, type SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ImSpinner3 } from "react-icons/im";
import type { Routing } from "../../../../interfaces/routingRuleInterface";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { createRoutingRule } from "../../../../services/operations/routingRule";
import ErrorPopup from "../../../../components/ErrorPopupPage";

interface AgencyCardProps {
  popUp?: Dispatch<SetStateAction<boolean>>;
  context: string;
  setContext: Dispatch<SetStateAction<string>>;
}

export default function RoutingRulePage({
  popUp,
  context,
  setContext,
}: AgencyCardProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);

  const [open, setOpen] = useState(false);
  const [openAgency, setOpenAgency] = useState(false);

  const campaignDropdown = useAppSelector(
    (state) => state.campaign.dropDown || []
  );
  const vendorDropdown = useAppSelector((state) => state.vendor.dropDown || []);

  const [selectedCampaign, setSelectedCampaign] =
    useState<string>("Select an Campaign");
  const [selectedVendor, setSelectedVendor] =
    useState<string>("Select an Vendor");


  const [form, setForm] = useState<Routing>({
    campaignId: 0,
    vendorId: 0,
    clickCount: undefined,
  });

  console.log(context);

  const formData = {
    ...form,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (context === "Create") {
      const res = await dispatch(createRoutingRule(formData));

      if (res) {
        popUp?.(false);
      }
      console.log(form);
      console.log(context);
    }
  };

  function cancelHandler() {
    console.log("Clicked in Cancel and context is: ", context);

    if (context === "Create") {
      popUp?.(false);
    }

    //   setAgencyData?.(null);
    setContext("");
  }

  return (
    <div
      className="min-h-screen inset-0 fixed  bg-black/40 p-6 z-50 
            flex items-center justify-center "
    >
      <ErrorPopup/>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
        aria-labelledby="edit-country-title"
      >
        <h2
          id="edit-country-title"
          className="text-2xl font-extrabold text-slate-900 mb-6"
        >
          {context === "Create" ? "Create Routing" : "Update Routing"}
        </h2>

        <div className="space-y-2">
          {/* ....................................CAMPAIGN.................................. */}

          {/* Dropdown */}
          <div className="w-full relative">
            {context === "Edit" ? (
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Campaign
              </label>
            ) : null}

            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-200"
            >
              {selectedCampaign}
              <MdOutlineArrowDropDownCircle
                className={`w-5 h-5 transform transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {open && (
              <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 animate-fadeIn">
                {campaignDropdown.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedCampaign(option?.name);
                      setForm((prev) => ({
                        ...prev,
                        campaignId: option?.id,
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

          {/* ....................................AGENCY................................... */}

          <div className="relative">
            {context === "Edit" ? (
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Agency
              </label>
            ) : null}

            <button
              onClick={() => setOpenAgency(!openAgency)}
              type="button"
              className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-200"
            >
              {selectedVendor}
              <MdOutlineArrowDropDownCircle
                className={`w-5 h-5 transform transition-transform ${
                  openAgency ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {openAgency && (
              <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 animate-fadeIn">
                {vendorDropdown .map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedVendor(option?.name);
                      setForm((prev) => ({
                        ...prev,
                        vendorId: option?.id,
                      }));
                      setOpenAgency(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Slider */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Click Count
            </label>

            <input
              type="number"
              value={form.clickCount}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev, // keep all previous values
                  clickCount: Number(e.target.value), // update only clickCount
                }))
              }
              placeholder="Etner Click Count"
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
