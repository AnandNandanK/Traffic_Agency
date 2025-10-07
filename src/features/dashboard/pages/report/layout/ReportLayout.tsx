import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import Pagination from "../../../../../components/Pagination";
import ReportTable from "../ReportTable";
import { getAllReport } from "../../../../../services/operations/report";

export default function ReportLayout() {
  const dispatch = useAppDispatch();


  const [currentPage, setCurrentPage] = useState<number>(0);

  const pages = useAppSelector(
    (state) => state.report.data?.totalElements || 1
  );

  const totalPages = Math.ceil(pages / 10);
  useEffect(() => {
    dispatch(getAllReport());
  }, [dispatch]);

  return (
    <div className="w-full">
      {/* Top Bar */}

      {/* Table */}
      <ReportTable />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p: number) => setCurrentPage(p)}
      />
    </div>
  );
}
