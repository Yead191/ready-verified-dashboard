"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { YearSelector } from "./YearSelector";
import { userData } from "@/data/chartData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{`${label} 2025`}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-sm text-gray-600">Candidate:</span>
            </div>
            <span className="text-sm font-medium">
              {data.Candidate.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span className="text-sm text-gray-600">Employee:</span>
            </div>
            <span className="text-sm font-medium">
              {data.Employee.toLocaleString()}
            </span>
          </div>
          <div className="border-t pt-1 mt-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-gray-700">
                Total:
              </span>
              <span className="text-sm font-semibold">
                {data.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function UserGroupChart() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mt-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">User Group</h2>
        <YearSelector defaultValue="2025" />
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={userData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value: any) => `${value / 1000}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
            <Bar
              dataKey="Candidate"
              fill="#60a5fa"
              radius={[2, 2, 0, 0]}
              name="Candidate"
            />
            <Bar
              dataKey="Employee"
              fill="#fb923c"
              radius={[2, 2, 0, 0]}
              name="Employee"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
