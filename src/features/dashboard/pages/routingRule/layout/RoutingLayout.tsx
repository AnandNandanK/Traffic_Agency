import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import RoutingRulePage from "../RoutingRulePage";
import RoutingTable from "../RoutingTable";
import Pagination from "../../../../../components/Pagination";
import {
  getAllRoutingList,
  getDropdownCampaign,
  getDropdownVendor,
} from "../../../../../services/operations/routingRule";

export default function RoutingRuleLayout() {
  const dispatch = useAppDispatch();

  // 🟦 Campaign dropdown
  const [selectedCampaign, setSelectedCampaign] = useState<string>("List by Campaign");
  const [campaignId, setCampaignId] = useState<number | undefined>(0);
  const [openCampaign, setOpenCampaign] = useState(false);
  const campaignList = useAppSelector((state) => state.campaign.dropDown || []);

  // 🟩 Agency dropdown
  const [selected, setSelected] = useState<string>("List by Agency");
  const [agencyId, setAgencyId] = useState<number | undefined>(0);
  const [open, setOpen] = useState(false);
  const agency = useAppSelector((state) => state.agency.data?.list || []);

  // 🟨 Common states
  const [showEditCard, setShowEditCard] = useState(false);
  const [context, setContext] = useState("");

  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalElements = useAppSelector(
    (state) => state.routing.data?.totalElements || 1
  );
  const totalPages = Math.ceil(totalElements / 10);

  // 🔹 Fetch dropdown data once
  useEffect(() => {
    dispatch(getDropdownCampaign());
    dispatch(getDropdownVendor());
    dispatch(getAllRoutingList());
  }, [dispatch]);


  // 🔹 Fetch routing list when agency or campaign changes
  useEffect(() => {
    dispatch(getAllRoutingList(campaignId ?? 0, agencyId ?? 0, currentPage));
  }, [campaignId, agencyId, currentPage, dispatch]);

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="p-3 flex flex-wrap gap-3 items-center">
        {/* Create Routing Rule Button */}
        <button
          onClick={() => {
            setShowEditCard(true);
            setContext("Create");
          }}
          className="bg-green-500 text-white p-2 rounded-md flex gap-2 items-center uppercase font-semibold shadow-md hover:bg-green-600 transition"
        >
          Create Routing Rule <FaPlus />
        </button>

        {/* 🟦 Campaign Dropdown */}
        <div className="relative min-w-[220px]">
          <button
            onClick={() => setOpenCampaign(!openCampaign)}
            type="button"
            className="w-full flex gap-2 items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-200"
          >
            {selectedCampaign}
            <MdOutlineArrowDropDownCircle
              className={`w-5 h-5 transform transition-transform ${
                openCampaign ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {openCampaign && (
            <ul className="absolute h-96 overflow-y-auto mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 animate-fadeIn">
              {campaignList.length > 0 ? (
                campaignList.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedCampaign(option?.name);
                      setCampaignId(option?.id);
                      setOpenCampaign(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  >
                    {option.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No campaigns found</li>
              )}
            </ul>
          )}
        </div>

        {/* 🟩 Agency Dropdown */}
        <div className="relative min-w-[220px]">
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="w-full flex gap-2 items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-200"
          >
            {selected}
            <MdOutlineArrowDropDownCircle
              className={`w-5 h-5 transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {open && (
            <ul className="absolute h-96 overflow-y-auto mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 animate-fadeIn">
              {agency.length > 0 ? (
                agency.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelected(option?.name);
                      setAgencyId(option?.id);
                      setOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  >
                    {option.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No agencies found</li>
              )}
            </ul>
          )}
        </div>

        {/* 🧹 Clear Filter Button */}
        <button
          onClick={() => {
            setSelected("List by Agency");
            setSelectedCampaign("List by Campaign");
            setAgencyId(undefined);
            setCampaignId(undefined);
            dispatch(getAllRoutingList());
          }}
          type="button"
          className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-200"
        >
          Clear Filter
        </button>
      </div>

      {/* Table */}
      <RoutingTable
        popUp={setShowEditCard}
        setContext={setContext}
        context={context}
      />

      {/* Popup for Create/Edit */}
      {showEditCard && (
        <RoutingRulePage
          popUp={setShowEditCard}
          context={context}
          setContext={setContext}
        />
      )}

      {/* Pagination */}
     
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p: number) => setCurrentPage(p)}
        />
     
    </div>
  );
}
