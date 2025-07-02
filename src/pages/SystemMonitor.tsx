import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSystemStats } from "@/hooks/useSystemData";
import { Activity, Cpu, HardDrive, MemoryStick, Thermometer, Clock } from "lucide-react";

const SystemMonitor = () => {
  const stats = useSystemStats();

  const formatUptime = (uptime: number) => {
    const seconds = Math.floor((Date.now() - uptime) / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getStatusColor = (value: number) => {
    if (value < 50) return "text-success";
    if (value < 80) return "text-warning"; 
    return "text-destructive";
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">System Monitor</h1>
        <p className="text-muted-foreground">Real-time system performance metrics</p>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CPU Usage */}
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-cpu" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats.cpu.toFixed(1)}%</div>
            <Progress value={stats.cpu} className="h-2 mb-2" />
            <p className={`text-xs ${getStatusColor(stats.cpu)}`}>
              {stats.cpu < 50 ? "Normal" : stats.cpu < 80 ? "Moderate" : "High"}
            </p>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <MemoryStick className="h-4 w-4 text-ram" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats.memory.toFixed(1)}%</div>
            <Progress value={stats.memory} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              {(stats.memory * 16 / 100).toFixed(1)}GB / 16GB
            </p>
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-storage" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats.storage.toFixed(1)}%</div>
            <Progress value={stats.storage} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              {(stats.storage * 500 / 100).toFixed(0)}GB / 500GB
            </p>
          </CardContent>
        </Card>

        {/* Network Activity */}
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Activity className="h-4 w-4 text-network" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats.network.toFixed(1)} MB/s</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>↓ Download</span>
                <span>{(stats.network * 0.7).toFixed(1)} MB/s</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>↑ Upload</span>
                <span>{(stats.network * 0.3).toFixed(1)} MB/s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats.temperature.toFixed(1)}°C</div>
            <Progress value={(stats.temperature - 30) * 2} className="h-2 mb-2" />
            <p className={`text-xs ${getStatusColor((stats.temperature - 30) * 2)}`}>
              {stats.temperature < 60 ? "Normal" : stats.temperature < 75 ? "Warm" : "Hot"}
            </p>
          </CardContent>
        </Card>

        {/* System Uptime */}
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{formatUptime(stats.uptime)}</div>
            <p className="text-xs text-success">99.9% availability</p>
            <p className="text-xs text-muted-foreground mt-1">
              Last reboot: {new Date(stats.uptime).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CPU</span>
                  <span className="text-sm">{stats.cpu.toFixed(1)}%</span>
                </div>
                <Progress value={stats.cpu} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Memory</span>
                  <span className="text-sm">{stats.memory.toFixed(1)}%</span>
                </div>
                <Progress value={stats.memory} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm">{stats.storage.toFixed(1)}%</span>
                </div>
                <Progress value={stats.storage} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">OS</span>
                <span className="font-medium">Ubuntu 22.04 LTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kernel</span>
                <span className="font-medium">5.15.0-72-generic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Architecture</span>
                <span className="font-medium">x86_64</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CPU</span>
                <span className="font-medium">Intel Core i7-9700K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cores</span>
                <span className="font-medium">8 cores / 8 threads</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Memory</span>
                <span className="font-medium">16 GB DDR4</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemMonitor;