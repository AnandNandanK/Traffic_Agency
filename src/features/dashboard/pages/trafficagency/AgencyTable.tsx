import { useState, type SetStateAction } from "react";
import {  useAppSelector } from "../../../../store/hooks";

import { BiSolidEdit } from "react-icons/bi";
import type { Dispatch } from "react";
import AgencyCUpage from "./createAgencyPage";

export type AgencyData = {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
};

const tableHead = [
  {
    key: 1,
    name: "Agency Id",
  },
  {
    key: 2,
    name: "Agency Name",
  },
  {
    key: 3,
    name: "Agency Phone Number",
  },
  {
    key: 4,
    name: "Agency Email",
  },
];

type TableProps = {
  popUp: Dispatch<SetStateAction<boolean>>;
  setContext: Dispatch<SetStateAction<string>>;
  context: string;
};

export default function AgencyTable({
  popUp,
  setContext,
  context,
}: TableProps) {


  const agency = useAppSelector((state) => state.agency.data?.list || []);
  // console.log("Store Data..",agency);

  const [agencyData, setAgencyData] = useState<AgencyData | null>(null);
  console.log("AgencyData", agencyData);


  const agencyHandler = (id: number, agency: AgencyData) => {
    setAgencyData(agency);
    setContext("Edit");
    console.log("Agency ID..", id);
  };

  return (
    <div className="overflow-x-auto  rounded-sm max-h-[calc(100vh-220px)] min-h-[calc(100vh-220px)] border-7 border-blue-950 ">
      {agencyData ? (
        <AgencyCUpage
          setAgencyData={setAgencyData}
          agencyData={agencyData}
          popUp={popUp}
          setContext={setContext}
          context={context}
        />
      ) : null}
      <table className="min-w-full overflow-y-auto">
        <thead className="bg-blue-950 text-white text-sm ">
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-center">
              Action
            </th>

            {tableHead.map((item) => {
              return (
                <th
                  key={item.key}
                  className="py-2 px-4 border-b border-gray-300 text-center"
                >
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {agency?.map((agency) => (
            <tr
              key={agency.id}
              className={`hover:bg-gray-300 ${
                agency.id % 2 == 0 ? "bg-gray-50" : "bg-gray-100"
              }`}
            >
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                <span
                  onClick={() => agencyHandler(agency.id, agency)}
                  className=" flex justify-center items-center gap-1 hover:cursor-pointer text-blue-500"
                >
                  Edit
                  <BiSolidEdit />
                </span>
              </td>

              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {agency.id}
              </td>

              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {agency.name}
              </td>

              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {agency.contactPhone}
              </td>

              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {agency.contactEmail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
