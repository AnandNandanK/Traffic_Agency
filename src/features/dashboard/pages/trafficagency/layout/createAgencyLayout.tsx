import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AgencyCUpage from "../createAgencyPage";
import AgencyTable from "../AgencyTable";



export default function CreateAgency() {
  const [showEditCard, setShowEditCard] = useState(false); // 👈 state
  const [context, setContext] = useState("");


  return (
    <div className="w-full">
      {/* Top Bar */}

      <div className="py-6 flex gap-2">

        <button
         onClick={() => {
            setShowEditCard(true);
            setContext("Create");
          }}
         className="bg-green-400 text-white p-2 rounded-sm hover:cursor-pointer flex gap-1 items-center uppercase font-semibold shadow-lg shadow-black/40">Create Agency<span><FaPlus /></span></button>

      </div>

      {/* Table */}
      <AgencyTable  popUp={setShowEditCard} setContext={setContext} context={context}/>
      
      {showEditCard && (
        <AgencyCUpage
          popUp={setShowEditCard}
          context={context}
          setContext={setContext}
        />
      )}
    </div>
  )
}
