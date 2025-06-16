
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardCards } from "@/components/DashboardCards";
import { SalesChart } from "@/components/SalesChart";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
              <p className="text-gray-600">Control panel</p>
            </div>
            <DashboardCards />
            <SalesChart />
          </main>
          <footer className="px-6 py-4 border-t bg-white">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>Copyright © 2024 - <span className="text-blue-600 font-medium">YukCoding Media</span>. All rights reserved.</p>
              <p>Version 0.1</p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
