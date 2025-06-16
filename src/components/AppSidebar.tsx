
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  LayoutDashboard,
  Truck,
  Users,
  Package,
  CreditCard,
  FileText,
  UserPlus,
  Settings,
} from "lucide-react";

const mainMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Suppliers",
    icon: Truck,
    url: "/suppliers",
    badge: 5,
  },
  {
    title: "Customers", 
    icon: Users,
    url: "/customers",
    badge: 3,
  },
  {
    title: "Products",
    icon: Package,
    url: "/products",
  },
  {
    title: "Transaction",
    icon: CreditCard,
    url: "/transactions",
  },
  {
    title: "Reports",
    icon: FileText,
    url: "/reports",
  },
];

const settingsItems = [
  {
    title: "Users / Employees",
    icon: UserPlus,
    url: "/users",
    badge: 4,
  },
  {
    title: "Configuration",
    icon: Settings,
    url: "/configuration",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0 bg-gray-800">
      <SidebarHeader className="border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-gray-600 text-white">A</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wide font-medium mb-2">
            MAIN MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-gray-300 hover:text-white hover:bg-gray-700 data-[active=true]:bg-purple-600 data-[active=true]:text-white"
                    isActive={item.url === "/"}
                  >
                    <a href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wide font-medium mb-2">
            SETTINGS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <a href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-red-600 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
