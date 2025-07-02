import { SystemStatsWidget } from "@/components/dashboard/SystemStatsWidget";
import { ServicesGrid } from "@/components/dashboard/ServicesGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Clock, Wifi, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Server Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and manage your server infrastructure
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Server Status
            </CardTitle>
            <Server className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Online</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Uptime
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">15d 7h</div>
            <p className="text-xs text-muted-foreground">99.9% availability</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Services
            </CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4/6</div>
            <p className="text-xs text-success">2 running containers</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Security
            </CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Secure</div>
            <p className="text-xs text-muted-foreground">No threats detected</p>
          </CardContent>
        </Card>
      </div>

      {/* System Stats */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">System Resources</h2>
        <SystemStatsWidget
          cpuUsage={45}
          memoryUsage={68}
          storageUsage={32}
          networkActivity={78}
        />
      </div>

      {/* Services */}
      <ServicesGrid />
    </div>
  );
};

export default Index;
