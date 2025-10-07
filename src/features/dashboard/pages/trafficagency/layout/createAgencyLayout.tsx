import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AgencyCUpage from "../createAgencyPage";
import AgencyTable from "../AgencyTable";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { getAllAgency } from "../../../../../services/operations/agency";
import Pagination from "../../../../../components/Pagination";


export default function CreateAgency() {
  const dispatch = useAppDispatch();


  const [showEditCard, setShowEditCard] = useState(false); // 👈 state
  const [context, setContext] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const pages = useAppSelector((state) => state.agency.data?.totalElements || 1);
  const totalPages = Math.ceil(pages / 10);

  console.log(totalPages)

  useEffect(() => {
    dispatch(getAllAgency(currentPage));
  }, [currentPage, dispatch]);

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
          Create Agency
          <span>
            <FaPlus />
          </span>
        </button>
      </div>

      {/* Table */}
      <AgencyTable
        popUp={setShowEditCard}
        setContext={setContext}
        context={context}
      />

      {showEditCard && (
        <AgencyCUpage
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
