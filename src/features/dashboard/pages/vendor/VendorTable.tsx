import { useState, type SetStateAction } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { BiSolidEdit } from "react-icons/bi";
import type { Dispatch } from "react";

import CreateVendor from "./CreateVendor";
import type { AllVendorResponse } from "../../../../interfaces/vendorInterface";

export type CampaignData = {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
};

const tableHead: { key: keyof AllVendorResponse; name: string }[] = [
  { key: "id", name: "Vendor Id" },
  { key: "secretKey", name: "Secret Key" },
  { key: "redirectionUrl", name: "Redirection Url" },
  { key: "name", name: "Name" },
  { key: "contactEmail", name: "Contact Email" },
  { key: "contactPhone", name: "Contact Phone" },
  { key: "requiredParams", name: "Requred Params" },
  { key: "dailyLimit", name: "Daily Limit" },
  { key: "isActive", name: "Active" },
  { key: "hasLimit", name: " Has Limit" },
  { key: "url", name: "Call Back Url " },
];

type TableProps = {
  popUp: Dispatch<SetStateAction<boolean>>;
  setContext: Dispatch<SetStateAction<string>>;
  context: string;
};

export default function VendorTable({
  popUp,
  setContext,
  context,
}: TableProps) {
  const vendor = useAppSelector((state) => state.vendor.data?.list || []);

  console.log("Store Data..", vendor);

  const [vnedorData, setVendorData] = useState<AllVendorResponse | null>(null);

  console.log("CampaignData", vnedorData);

  const CampaignHandler = (id: number, vendor: AllVendorResponse) => {
    setVendorData(vendor);
    setContext("Edit");
    console.log("Vendor ID..", id);
  };

  return (
    <div className="overflow-x-auto max-h-[calc(100vh-220px)] min-h-[calc(100vh-220px)] rounded-sm border-7 border-blue-950 ">
      {vnedorData ? (
        <CreateVendor
          setVendorData={setVendorData}
          vendorData={vnedorData}
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
          {vendor.map((vendor) => (
            <tr
              key={vendor.id}
              className={`hover:bg-gray-300 ${
                vendor.id % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              }`}
            >
              {/* Edit button */}
              <td
                className={`py-2 px-4 border-b border-gray-300 text-center  ${
                  vendor.id % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                }`}
              >
                <span
                  onClick={() => CampaignHandler(vendor.id, vendor)}
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
                  {item.key === "requiredParams"
                    ? `${vendor.requiredParams.clickIdKey} | ${JSON.stringify(
                        vendor.requiredParams.additionalParams
                      )}`
                    : item.key === "isActive" || item.key === "hasLimit"
                    ? vendor[item.key]
                      ? "True"
                      : "False"
                    : item.key in vendor
                    ? String(vendor[item.key as keyof AllVendorResponse])
                    : null}
                </td>
              ))}
            </tr>
          ))}

          
        </tbody>
      </table>
    </div>
  );
}
