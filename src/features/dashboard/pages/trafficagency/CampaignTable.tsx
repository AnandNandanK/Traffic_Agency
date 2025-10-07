import { useState, type SetStateAction } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { BiSolidEdit } from "react-icons/bi";
import type { Dispatch } from "react";
import CreateCampaigns from "./createCampaigns";
import type { CampaignResponse } from "../../../../interfaces/agencyInterface";

export type CampaignData = {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
};

const tableHead: { key: keyof CampaignResponse; name: string }[] = [
  { key: "id", name: "Campaign Id" },
  { key: "agencyId", name: "Agency ID" },
  { key: "name", name: "Name" },
  { key: "isActive", name: "Active" },
  { key: "callbackUrl", name: "Callback Url" },
  { key: "urlParams", name: "Url Params" },
  { key: "campaignPublicId", name: "Campaign Public Id" },
  { key: "notificationThreshold", name: "Notification Threshold" },
  { key: "totalVendorCallbackReceieved", name: "Total Vendor Call Back Receieved" },
  { key: "totalTrafficCallbackSend", name: "Total Traffic Callback Send" },
  { key: "url", name: "Call Back Url " },
];


type TableProps = {
  popUp: Dispatch<SetStateAction<boolean>>;
  setContext: Dispatch<SetStateAction<string>>;
  context: string;
};

export default function CampaignTable({
  popUp,
  setContext,
  context,
}: TableProps) {

  const campaigns = useAppSelector((state) => state.campaign.data?.list || []);

  // console.log("Store Data..",Campaign);

  const [campaignData, setCampaignData] = useState<CampaignResponse | null>(null);

  console.log("CampaignData", campaignData);


  const CampaignHandler = (id: number, Campaign: CampaignResponse) => {
    setCampaignData(Campaign);
    setContext("Edit");
    console.log("Campaign ID..", id);
  };


  return (
    <div className="overflow-x-auto max-h-[calc(100vh-220px)] min-h-[calc(100vh-220px)] rounded-sm border-7 border-blue-950 ">
      {campaignData ? (

        <CreateCampaigns 
          setCampaignData={setCampaignData}
          campaignData={campaignData}
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
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className={`hover:bg-gray-300 ${
                campaign.id % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              }`}
            >
              {/* Edit button */}
              <td className={`py-2 px-4 border-b border-gray-300 text-center  ${campaign.id % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}>
                <span
                  onClick={() => CampaignHandler(campaign.id, campaign)}
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
                  {item.key === "urlParams"
                    ? `${campaign.urlParams.clickIdKey} | ${JSON.stringify(
                        campaign.urlParams.additionalParams
                      )}`
                    : item.key in campaign
                    ? (campaign[item.key as keyof CampaignResponse] as
                        | string
                        | number
                        | boolean)
                    : null}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
}
