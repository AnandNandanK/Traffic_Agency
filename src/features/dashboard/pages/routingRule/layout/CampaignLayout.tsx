import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdSystemUpdateAlt } from "react-icons/md";

import { useAppDispatch } from "../../../../../store/hooks";
import { getAllCampaign } from "../../../../../services/operations/agency";


export default function RoutingRuleLayout() {
  const dispatch=useAppDispatch()

  const [showEditCard, setShowEditCard] = useState(false); // 👈 state
  const [context, setContext] = useState("");


  useEffect(()=>{
    dispatch(getAllCampaign());
  },[dispatch])

  return (
    <div className="w-full">
      {/* Top Bar */}

      <div className="p-6 flex gap-2">

        <button
         onClick={() => {
            setShowEditCard(true);
            setContext("Create");
          }}
         className="bg-green-400 text-white p-2 rounded-sm hover:cursor-pointer flex gap-1 items-center uppercase font-semibold shadow-lg shadow-black/40">Create Routing Rule<span><FaPlus /></span></button>
        <button 
          onClick={() => {
            setShowEditCard(true);
            setContext("Edit");
          }}
        className="bg-sky-500 text-white p-2 rounded-sm hover:cursor-pointer flex gap-1 items-center uppercase font-semibold shadow-lg shadow-black/40">Update Routing Rule <span><MdSystemUpdateAlt /></span></button>

      </div>

      {/* Table */}
      {/* <CampaignTable  popUp={setShowEditCard} setContext={setContext} context={context}/> */}

      {showEditCard && (
        <RoutingRuleLayout
          popUp={setShowEditCard}
          context={context}
          setContext={setContext}
        />
      )}
    </div>
  )
}
