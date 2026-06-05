"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";

const colors = ["#14b8a6", "#38bdf8", "#f43f5e"];

export default function DashboardCharts({ data }) {
  return (
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_0.9fr]">
      <Card className="min-h-80">
        <h2 className="font-semibold">Revenue Trend</h2>
        <div className="mt-5 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.revenueTrend}>
              <defs><linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#14b8a6" stopOpacity={0.48} /><stop offset="100%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.16} />
              <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "0", background: "rgba(15,23,42,.9)", color: "white" }} />
              <Area type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} fill="url(#revenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="min-h-80">
        <h2 className="font-semibold">Subscription Mix</h2>
        <div className="mt-5 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.subscriptions} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>
                {data.subscriptions.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "0", background: "rgba(15,23,42,.9)", color: "white" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="xl:col-span-2">
        <h2 className="font-semibold">User Growth</h2>
        <div className="mt-5 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.16} />
              <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "0", background: "rgba(15,23,42,.9)", color: "white" }} />
              <Bar dataKey="users" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
