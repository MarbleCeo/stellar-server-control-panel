import { Activity, HardDrive, Cpu, MemoryStick } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SystemStatsProps {
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  networkActivity: number;
}

export function SystemStatsWidget({
  cpuUsage = 45,
  memoryUsage = 68,
  storageUsage = 32,
  networkActivity = 78
}: SystemStatsProps) {
  const stats = [
    {
      title: "CPU Usage",
      value: cpuUsage,
      icon: Cpu,
      color: "cpu",
      unit: "%"
    },
    {
      title: "Memory",
      value: memoryUsage,
      icon: MemoryStick,
      color: "ram",
      unit: "%"
    },
    {
      title: "Storage",
      value: storageUsage,
      icon: HardDrive,
      color: "storage",
      unit: "%"
    },
    {
      title: "Network",
      value: networkActivity,
      icon: Activity,
      color: "network",
      unit: "MB/s"
    }
  ];

  const getStatusColor = (value: number) => {
    if (value < 50) return "text-success";
    if (value < 80) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (colorType: string) => {
    switch (colorType) {
      case "cpu": return "bg-cpu";
      case "ram": return "bg-ram";
      case "storage": return "bg-storage";
      case "network": return "bg-network";
      default: return "bg-primary";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-card bg-gradient-surface animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                {stat.unit}
              </span>
            </div>
            <div className="mt-2">
              <Progress 
                value={stat.value} 
                className="h-2"
                style={{
                  background: `hsl(var(--muted))`,
                }}
              />
            </div>
            <p className={`text-xs mt-1 ${getStatusColor(stat.value)}`}>
              {stat.value < 50 ? "Normal" : stat.value < 80 ? "Moderate" : "High"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}