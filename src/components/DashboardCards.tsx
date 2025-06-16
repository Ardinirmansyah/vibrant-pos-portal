
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Truck, Users, UserPlus } from "lucide-react";

const cardData = [
  {
    title: "ITEMS",
    value: "7",
    icon: ShoppingBag,
    bgColor: "bg-blue-500",
    iconBg: "bg-blue-600",
  },
  {
    title: "SUPPLIERS", 
    value: "5",
    icon: Truck,
    bgColor: "bg-red-500",
    iconBg: "bg-red-600",
  },
  {
    title: "CUSTOMERS",
    value: "3", 
    icon: Users,
    bgColor: "bg-green-500",
    iconBg: "bg-green-600",
  },
  {
    title: "USERS",
    value: "4",
    icon: UserPlus,
    bgColor: "bg-orange-500", 
    iconBg: "bg-orange-600",
  },
];

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className={`${card.bgColor} text-white p-6 rounded-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
                <div className={`${card.iconBg} p-3 rounded-lg`}>
                  <card.icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
