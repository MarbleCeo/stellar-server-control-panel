import { NavLink, useLocation } from "react-router-dom";
import {
  Monitor,
  Activity,
  Users,
  Folder,
  Package,
  Shield,
  Home,
  Server,
  HardDrive,
  Wifi,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Overview", url: "/", icon: Home },
  { title: "System Monitor", url: "/monitor", icon: Activity },
  { title: "Services", url: "/services", icon: Package },
  { title: "Containers", url: "/containers", icon: Monitor },
  { title: "Storage", url: "/storage", icon: HardDrive },
  { title: "Network", url: "/network", icon: Wifi },
  { title: "Files", url: "/files", icon: Folder },
  { title: "Users", url: "/users", icon: Users },
  { title: "Security", url: "/security", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function ServerSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-accent/10 text-foreground hover:text-accent-foreground transition-all duration-200";

  return (
    <Sidebar className="border-r bg-gradient-surface">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-widget">
            <Server className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-foreground">NexusCore</h1>
              <p className="text-sm text-muted-foreground">Server Command Center</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) => getNavClasses({ isActive })}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="ml-3 font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 border-t">
            <div className="bg-card rounded-lg p-3 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                <span className="text-sm font-medium text-foreground">
                  Server Status
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                Uptime: 15d 7h 23m
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}