import { useState, type SetStateAction } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { BiSolidEdit } from "react-icons/bi";
import type { Dispatch } from "react";

import RoutingRulePage from "./RoutingRulePage";
import type { AllRoutingResponse } from "../../../../slices/routingRuleSlice";

export type RoutingnData = {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
};

const tableHead: { key: keyof AllRoutingResponse; name: string }[] = [
  { key: "id", name: "Routing Id" },
  { key: "campaignId", name: "Campaign Id" },
  { key: "vendorId", name: "Vendor Id" },
  { key: "nthClick", name: "Nth Click" },
  { key: "isActive", name: "Active" },
  { key: "isDefault", name: "Default" },
  { key: "campaign", name: "Campaign Name" },
  { key: "vendor", name: "Vendor Name" },
];

type TableProps = {
  popUp: Dispatch<SetStateAction<boolean>>;
  setContext: Dispatch<SetStateAction<string>>;
  context: string;
};

export default function RoutingTable({
  popUp,
  setContext,
  context,
}: TableProps) {
  const Routing = useAppSelector((state) => state.routing.data?.list || []);

  console.log("Store Data..", Routing);

  const [routingData, setRoutingData] = useState<AllRoutingResponse | null>(
    null
  );

  console.log("RoutingnData", routingData);

  const RoutingnHandler = (id: number, Routing: AllRoutingResponse) => {
    setRoutingData(Routing);
    setContext("Edit");
    console.log("Routing ID..", id);
  };

  return (
    <div className="overflow-x-auto max-h-[calc(100vh-220px)] min-h-[calc(100vh-220px)] rounded-sm border-7 border-blue-950 ">
      {routingData ? (
        <RoutingRulePage
          setRoutingData={setRoutingData}
          routingData={routingData}
          popUp={popUp}
          setContext={setContext}
          context={context}
        />
      ) : null}

      <table className="min-w-full overflow-y-auto">
        <thead className="bg-blue-950 text-white ">
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-center">
              Action
            </th>

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
          {Routing.map((Routing) => (
            <tr
              key={Routing.id}
              className={`hover:bg-gray-300 ${
                Routing.id % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              }`}
            >
              {/* Edit button */}
              <td
                className={`py-2 px-4 border-b border-gray-300 text-center  ${
                  Routing.id % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                }`}
              >
                <span
                  onClick={() => RoutingnHandler(Routing.id, Routing)}
                  className=" flex justify-center items-center gap-1 hover:cursor-pointer text-blue-500"
                >
                  Edit <BiSolidEdit />
                </span>
              </td>

              {/* Table data dynamically */}
              {tableHead.map((item) => (
                <td
                  key={item.key}
                  className="py-2 px-4 border-b border-gray-300 text-center whitespace-nowrap"
                >
                  {item.key === "campaign"
                    ? Routing.campaign?.name
                    : item.key === "vendor"
                    ? Routing.vendor?.name
                    : typeof Routing[item.key] === "boolean"
                    ? Routing[item.key]
                      ? "True"
                      : "True"
                    : Routing[item.key]}
                </td>
              ))}
            </tr>
          ))}

          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}
