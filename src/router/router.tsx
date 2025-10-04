// router.tsx

import { createBrowserRouter, Navigate } from "react-router";
import OpenRoute from "./openRoute";
import Login from "../features/auth/login";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import CreateAgency from "../features/dashboard/pages/trafficagency/layout/createAgencyLayout";
import CampaignLayout from "../features/dashboard/pages/trafficagency/layout/CampaignLayout";
import CreateVendorLayout from "../features/dashboard/pages/vendor/vendorLayout/CreateVendorLayout";
import RoutingRuleLayout from "../features/dashboard/pages/routingRule/layout/RoutingLayout";

 

export const router = createBrowserRouter([


  { path: "/", element: <Navigate to="/login" replace /> },
  {
    element: <OpenRoute/>, // 👈 children yaha aayenge Outlet ke
    children: [
      { path: "/login", element: <Login /> },
    ],
  },

   {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <div className="text-center text-3xl font-bold text-blue-500">
                Welcome to Dashboard
              </div>
            ),
          },
          { path: "createagency", element: <CreateAgency/> },
          { path: "agencycampaigns", element: <CampaignLayout />},
          { path: "vendor", element: <CreateVendorLayout />},
          { path: "routing-rule", element: <RoutingRuleLayout />},
 
  
          // {
          //   path: "location",
          //   children: [
          //     {
          //       index: true, // 👈 /dashboard/location
          //       element: (
          //         <div className="text-center text-2xl font-semibold text-green-500">
          //           Welcome to Locations
          //         </div>
          //       ),
          //     },
          //     { path: "countries", element: <Countries /> },
          //     // { path: "regions", element: <Regions /> }, 
          //     { path: "cities", element: <Cities /> },  
          //   ],
          // },
          // {
          //   path: "venue",
          //   children: [
          //     {
          //       index: true, // 👈 /dashboard/location
          //       element:<VenueComponent/>
          //       ,
          //     },
          //     { path: "facilities", element: <Facilities /> },
             
          //   ],
          // },
        ],
      },
    ],
  },
  

]);
