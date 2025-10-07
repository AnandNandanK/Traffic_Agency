import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateVendor from "../CreateVendor";
import VendorTable from "../VendorTable";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { getAllVendor } from "../../../../../services/operations/vendor";
import Pagination from "../../../../../components/Pagination";

export default function CreateVendorLayout() {
  const dispatch = useAppDispatch();

  const [showEditCard, setShowEditCard] = useState(false); // 👈 state
  const [context, setContext] = useState("");

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pages = useAppSelector(
    (state) => state.vendor.data?.totalElements || 1
  );
  const totalPages = Math.ceil(pages / 10);

  useEffect(() => {
    dispatch(getAllVendor());
  }, [dispatch]);

  return (
    <div className="w-full">
      {/* Top Bar */}

      <div className="p-3 flex gap-2">
        <button
          onClick={() => {
            setShowEditCard(true);
            setContext("Create");
          }}
          className="bg-green-400 text-white p-2 rounded-sm hover:cursor-pointer flex gap-1 items-center uppercase font-semibold shadow-lg shadow-black/40"
        >
          Create Vendor
          <span>
            <FaPlus />
          </span>
        </button>
      </div>

      {/* Table */}
      <VendorTable
        popUp={setShowEditCard}
        setContext={setContext}
        context={context}
      />

      {showEditCard && (
        <CreateVendor
          popUp={setShowEditCard}
          context={context}
          setContext={setContext}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p: number) => setCurrentPage(p)}
      />
    </div>
  );
}
