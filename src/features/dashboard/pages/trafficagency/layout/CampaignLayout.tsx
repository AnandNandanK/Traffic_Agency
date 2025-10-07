import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateCampaigns from "../createCampaigns";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { getAllCampaign } from "../../../../../services/operations/agency";
import CampaignTable from "../CampaignTable";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import Pagination from "../../../../../components/Pagination";


export default function CampaignLayout() {
  const dispatch = useAppDispatch();

  const [showEditCard, setShowEditCard] = useState(false); // 👈 state
  const [context, setContext] = useState("");
  const [selected, setSelected] = useState<string>("List by agency");
  const [agencyId, setAgencyId] = useState<number | undefined>(0);
  const [open, setOpen] = useState(false);
  const agency = useAppSelector((state) => state.agency.data?.list || []);


  const [currentPage, setCurrentPage] = useState<number>(0);
  const pages = useAppSelector((state) => state.campaign.data?.totalElements || 1);
  const totalPages = Math.ceil(pages / 10);


  useEffect(()=>{
   dispatch(getAllCampaign(agencyId,currentPage))
  },[dispatch,agencyId,currentPage])

 

  return (
    <div className="w-full">
      {/* Top Bar */}

      <div className="py-3 flex gap-2">
        <button
          onClick={() => {
            setShowEditCard(true);
            setContext("Create");
          }}
          className="bg-green-400 text-white p-2 rounded-sm hover:cursor-pointer flex gap-1 items-center uppercase font-semibold shadow-lg shadow-black/40"
        >
          Create Campaign
          <span>
            <FaPlus />
          </span>
        </button>


        {/* Dropdown */}
        <div className="relative">
          {context === "Edit" ? (
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Agency
            </label>
          ) : null}

          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="w-full flex gap-2 items-center justify-between bg-white border border-gray-300  rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-200"
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
              {agency.map((option, index) => (
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
              ))}
            </ul>
          )}
        </div>
        
         <button
            onClick={() =>{
              dispatch(getAllCampaign());
              setAgencyId(undefined);
              setSelected("List by agency")
            }}
            type="button"
            className=" flex gap-2 items-center justify-between bg-white border border-gray-300  rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md transition duration-200"
          >
           Clear Filter
          </button>

      </div>

      {/* Table */}
      <CampaignTable
        popUp={setShowEditCard}
        setContext={setContext}
        context={context}
      />

      {showEditCard && (
        <CreateCampaigns
          popUp={setShowEditCard}
          context={context}
          setContext={setContext}
        />
      )}

      <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={(p:number) => setCurrentPage(p)}
           />
    </div>
  );
}
