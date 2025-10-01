import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdSystemUpdateAlt } from "react-icons/md";
import AgencyCUpage from "../createAgencyPage";



export default function CreateAgency() {

  const [showEditCard, setShowEditCard] = useState(false); // 👈 state
  const [context, setContext] = useState("");
  const [rowId, setRowId] = useState<number>(0);


  return (
    <div className="w-full">
      {/* Top Bar */}

      <div className="p-6 flex gap-2">

        <button
         onClick={() => {
            setShowEditCard(true);
            setContext("Create");
          }}
         className="bg-green-400 text-white p-2 rounded-sm hover:cursor-pointer flex gap-1 items-center uppercase font-semibold shadow-lg shadow-black/40">Create Agency<span><FaPlus /></span></button>
        <button 
          onClick={() => {
            setShowEditCard(true);
            setContext("Edit");
          }}
        className="bg-sky-500 text-white p-2 rounded-sm hover:cursor-pointer flex gap-1 items-center uppercase font-semibold shadow-lg shadow-black/40">Update Agency <span><MdSystemUpdateAlt /></span></button>

      </div>

      {/* Table */}
      <div></div>

      {showEditCard && (
        <AgencyCUpage
          popUp={setShowEditCard}
          context={context}
          countryId={rowId}
          setContext={setContext}
        />
      )}
    </div>
  )
}
