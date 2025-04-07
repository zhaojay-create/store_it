"use client";

import React, { FC } from "react";
import { Pie, PieChart, Cell } from "recharts";
import { Card } from "@/components/ui/card";
import { convertFileSize } from "@/lib/utils";

interface ChartProps {
  used: number;
  total: number;
}

const Chart: FC<ChartProps> = ({ used, total }) => {
  const chartData = [
    { name: "Used", value: used, fill: "white" },
    { name: "Free", value: total - used, fill: "pink" }, // 淡粉色
  ];

  const percentageUsed = ((used / total) * 100).toFixed(2);

  return (
    <Card className="h-full flex flex-row items-center bg-brand-100 text-white p-6 rounded-xl">
      {/* 左侧 Pie 图 */}
      <div className="relative flex justify-center items-center w-1/2">
        <PieChart width={150} height={150}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={60}
            strokeWidth={5}
            stroke="hsl(var(--brand-200))" // 淡粉色边框
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
        {/* 百分比文字 */}
        <div className="absolute text-center">
          <p className="text-2xl font-bold">{percentageUsed}%</p>
          <p className="text-sm">Space used</p>
        </div>
      </div>

      {/* 右侧文字内容 */}
      <div className="flex flex-col justify-center items-start w-1/2 pl-6">
        <p className="text-lg font-semibold">Available Storage</p>
        <p className="text-base">
          {convertFileSize(used)} / {convertFileSize(total)}
        </p>
      </div>
    </Card>
  );
};

export default Chart;
