
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartData = [
  {
    name: "Pencil 2B",
    sales: 6,
  },
  {
    name: "Aqua", 
    sales: 2,
  },
  {
    name: "Buku Sidu",
    sales: 2,
  },
  {
    name: "Pilot Pen",
    sales: 2,
  },
  {
    name: "Pop Mie",
    sales: 1,
  },
];

export function SalesChart() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
          </div>
          <span>Best Selling Products This Month</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Bar 
                dataKey="sales" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
