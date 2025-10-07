
import { useAppSelector } from "../../../../store/hooks";
import type { Traffic } from "../../../../interfaces/report";

export type CampaignData = {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
};


const tableHead: { key: keyof Traffic; name: string }[] = [
  { key: "id", name: "Click Id" },
  { key: "adClickId", name: "Ad Click Id" },
  { key: "ipAddress", name: "IP Address" },
  { key: "vendorClickId", name: "Vendor Click Id" },
  { key: "hasCallbackReceived", name: "Callback Received" },
  { key: "callbackReceivedAt", name: "Callback Received At" },
  { key: "notifiedAt", name: "Notified At" },
  { key: "responseCode", name: "Response Code" },
];




export default function ReportTable() {

  const reports = useAppSelector((state) => state.report.data?.list || []);

  console.log("Store Data..", reports);

  return (
    <div className="overflow-x-auto max-h-[calc(100vh-150px)] min-h-[calc(100vh-150px)] rounded-sm border-7 border-blue-950 ">


      <table className="min-w-full overflow-y-auto">
        <thead className="bg-blue-950 text-white ">
          <tr>
            {tableHead.map((item) => {
              return (
                <th
                  key={item.key}
                  className="py-2 px-4 border-b border-gray-300 text-center text-sm whitespace-nowrap"
                >
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr
              key={report.id}
              className={`hover:bg-gray-300 ${
                Number(report.id) % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              }`}
            >
            
              {/* Table data dynamically */}
              {tableHead.map((item) => (
                <td
                  key={item.key}
                  className="py-2 px-4 border-b border-gray-300 text-center whitespace-nowrap"
                >
                 {
                  report[item.key]
                 }
                </td>
              ))}
            </tr>
          ))}

          
        </tbody>
      </table>
    </div>
  );
}
