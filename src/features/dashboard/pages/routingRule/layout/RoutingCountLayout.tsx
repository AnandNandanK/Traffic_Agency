import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

interface AgencyTraffic {
  agencyName: string;
  trafficCount: number;
  callbackSent: number;
}

interface VendorTraffic {
  vendorName: string;
  trafficCount: number;
  callbackReceived: number;
}

interface TrafficReportResponse {
  agencyTraffic: AgencyTraffic[];
  vendorTraffic: VendorTraffic[];
}

const CountingRoute = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [trafficData, setTrafficData] = useState<TrafficReportResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const fetchTrafficReport = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      setLoading(true);
      const fromDate = format(startDate, "yyyy-MM-dd");
      const toDate = format(endDate, "yyyy-MM-dd");

      const response = await axios.get(
        BASE_URL+`/api/v1/report?fromDate=${fromDate}&toDate=${toDate}`
      );

      setTrafficData(response.data.data);
    } catch (error) {
      console.error("Error fetching traffic report:", error);
      alert("Failed to fetch traffic report. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Traffic Report</h1>

        {/* Date Filter Section */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="w-48 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="w-48 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            onClick={fetchTrafficReport}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-medium text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Loading..." : "Filter"}
          </button>
        </div>
      </div>

      {/* Agency Traffic Section */}
      <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Agency Traffic</h2>
        </div>
        <div className="overflow-x-auto">
          {!trafficData ? (
            <p className="p-4 text-gray-500 text-sm">No data to display.</p>
          ) : (
            <table className="min-w-full text-left border-t border-gray-100">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Agency Name</th>
                  <th className="px-4 py-2 border-b">Traffic Count</th>
                  <th className="px-4 py-2 border-b">Callback Sent</th>
                </tr>
              </thead>
              <tbody>
                {trafficData.agencyTraffic.map((agency, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{agency.agencyName}</td>
                    <td className="px-4 py-2">{agency.trafficCount}</td>
                    <td className="px-4 py-2">{agency.callbackSent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Vendor Traffic Section */}
      <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Vendor Traffic</h2>
        </div>
        <div className="overflow-x-auto">
          {!trafficData ? (
            <p className="p-4 text-gray-500 text-sm">No data to display.</p>
          ) : (
            <table className="min-w-full text-left border-t border-gray-100">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Vendor Name</th>
                  <th className="px-4 py-2 border-b">Traffic Count</th>
                  <th className="px-4 py-2 border-b">Callback Received</th>
                </tr>
              </thead>
              <tbody>
                {trafficData.vendorTraffic.map((vendor, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{vendor.vendorName}</td>
                    <td className="px-4 py-2">{vendor.trafficCount}</td>
                    <td className="px-4 py-2">{vendor.callbackReceived}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountingRoute;
