import { MdKeyboardArrowRight } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";
import { useState } from "react";
import { FaChalkboardUser } from "react-icons/fa6";
import { GrVirtualMachine } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { ImTrello } from "react-icons/im";
import { TbReport } from "react-icons/tb";

const sideData = [
  {
    id: 1,
    title: "Traffic Agency",
    submenu: [
      { key: "createagency", title: "Agency", path: "/dashboard/createagency", icon: <ImTrello  /> },
      { key: "createcampaigns", title: "Campaigns", path: "/dashboard/agencycampaigns", icon: <LiaCitySolid /> },
      // { key: "city", title: "Cities", path: "/dashboard/location/cities", icon: <GiModernCity /> },
    ],
  },
  {
    id: 2,
    title: "Vendor",
    submenu: [
      { key: "vendor", title: "Vendor", path: "/dashboard/vendor", icon: <FaChalkboardUser size={20}/> },
    ],
  },
  {
    id: 3,
    title: "Routing",
    submenu: [
      { key: "routingrule", title: "Routing Rule", path: "/dashboard/routing-rule", icon: <GrVirtualMachine size={20}/> },
    ],
  },
  
  {
    id: 4,
    title: "Report",
    submenu: [
      { key: "report", title: "Traffic Report", path: "/dashboard/report", icon: <TbReport  size={20}/> },
    ],
  },

];

export default function Menue() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full mt-9 flex flex-col gap-4">
      {sideData.map((item) => (
        <div key={item.id} className="mb-2">
          {/* Parent menu */}
          <div
            className="flex justify-between items-center cursor-pointer text-white hover:text-blue-600"
            onClick={() => toggleMenu(item.id)}
          >
            <span className="font-medium">{item.title}</span>
            <MdKeyboardArrowRight
              size={23}
              className={`transition-transform duration-300 ${
                openId === item.id ? "rotate-90" : ""
              }`}
            />
          </div>

          {/* Submenu */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openId === item.id ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="ml-6 mt-2 flex flex-col gap-2">
              {item.submenu.map((sub) => (
                <NavLink
                  key={sub.key}
                  to={sub.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-1 rounded-md transition ${
                      isActive ? "bg-white text-black" : "text-gray-300 hover:text-blue-500"
                    }`
                  }
                >
                  {sub.icon}
                  <span>{sub.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white p-[1px] mt-2"></div>
    </div>
  );
}
