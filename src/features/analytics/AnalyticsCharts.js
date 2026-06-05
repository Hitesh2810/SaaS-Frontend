"use client";

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";

export default function AnalyticsCharts({ data }) {
  return (
    <div className="mt-6 grid gap-5 xl:grid-cols-2">
      <Card>
        <h2 className="font-semibold">Revenue Quality</h2>
        <div className="mt-5 h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.revenueTrend}><CartesianGrid strokeDasharray="3 3" opacity={0.16} /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area type="monotone" dataKey="revenue" stroke="#14b8a6" fill="#14b8a633" strokeWidth={3} /></AreaChart></ResponsiveContainer></div>
      </Card>
      <Card>
        <h2 className="font-semibold">Product Adoption</h2>
        <div className="mt-5 h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={data.userGrowth}><CartesianGrid strokeDasharray="3 3" opacity={0.16} /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="users" stroke="#38bdf8" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></div>
      </Card>
    </div>
  );
}
