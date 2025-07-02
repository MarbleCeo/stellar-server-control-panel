import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Monitor, Play, Square, RotateCcw, Search, Plus, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Container {
  id: string;
  name: string;
  image: string;
  status: "running" | "stopped" | "paused" | "restarting";
  cpuUsage: number;
  memoryUsage: number;
  memoryLimit: number;
  ports: string[];
  created: string;
  uptime: string;
}

const Containers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [containers, setContainers] = useState<Container[]>([
    {
      id: "webapp_1",
      name: "nexus-webapp",
      image: "node:18-alpine",
      status: "running",
      cpuUsage: 15.4,
      memoryUsage: 128,
      memoryLimit: 512,
      ports: ["3000:3000"],
      created: "2024-01-15 10:30:45",
      uptime: "2d 5h 12m"
    },
    {
      id: "db_1", 
      name: "nexus-database",
      image: "postgres:15",
      status: "running",
      cpuUsage: 8.2,
      memoryUsage: 256,
      memoryLimit: 1024,
      ports: ["5432:5432"],
      created: "2024-01-15 10:30:42",
      uptime: "2d 5h 15m"
    },
    {
      id: "cache_1",
      name: "nexus-redis",
      image: "redis:7-alpine", 
      status: "running",
      cpuUsage: 2.1,
      memoryUsage: 32,
      memoryLimit: 128,
      ports: ["6379:6379"],
      created: "2024-01-15 10:30:48",
      uptime: "2d 5h 9m"
    },
    {
      id: "nginx_1",
      name: "nexus-proxy",
      image: "nginx:alpine",
      status: "running",
      cpuUsage: 1.8,
      memoryUsage: 16,
      memoryLimit: 64,
      ports: ["80:80", "443:443"],
      created: "2024-01-15 10:30:35",
      uptime: "2d 5h 22m"
    },
    {
      id: "monitor_1",
      name: "nexus-monitoring",
      image: "grafana/grafana:latest",
      status: "stopped",
      cpuUsage: 0,
      memoryUsage: 0,
      memoryLimit: 256,
      ports: ["3001:3000"],
      created: "2024-01-14 15:22:10",
      uptime: "0m"
    },
    {
      id: "backup_1",
      name: "nexus-backup",
      image: "postgres:15",
      status: "paused",
      cpuUsage: 0,
      memoryUsage: 64,
      memoryLimit: 128,
      ports: [],
      created: "2024-01-13 09:15:30",
      uptime: "0m"
    }
  ]);

  const filteredContainers = containers.filter(container =>
    container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    container.image.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-success text-success-foreground";
      case "stopped": return "bg-secondary text-secondary-foreground";
      case "paused": return "bg-warning text-warning-foreground";
      case "restarting": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow" />;
      case "stopped": return <Square className="w-3 h-3 text-muted-foreground" />;
      case "paused": return <div className="w-2 h-2 bg-warning rounded-full" />;
      case "restarting": return <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />;
      default: return null;
    }
  };

  const handleContainerAction = async (containerId: string, action: 'start' | 'stop' | 'restart' | 'pause' | 'unpause') => {
    const container = containers.find(c => c.id === containerId);
    if (!container) return;

    // Simulate API call
    setTimeout(() => {
      let newStatus: Container['status'] = container.status;
      
      switch (action) {
        case 'start':
        case 'unpause':
          newStatus = 'running';
          break;
        case 'stop':
          newStatus = 'stopped';
          break;
        case 'pause':
          newStatus = 'paused';
          break;
        case 'restart':
          newStatus = 'running';
          break;
      }

      setContainers(prev => prev.map(c => 
        c.id === containerId ? { 
          ...c, 
          status: newStatus,
          cpuUsage: newStatus === 'running' ? Math.random() * 20 : 0,
          memoryUsage: newStatus === 'running' ? c.memoryLimit * (0.1 + Math.random() * 0.4) : 0,
          uptime: newStatus === 'running' ? "0m" : "0m"
        } : c
      ));

      toast({
        title: `Container ${action}ed`,
        description: `${container.name} has been ${action}ed successfully.`,
      });
    }, 1500);
  };

  const runningContainers = containers.filter(c => c.status === 'running').length;
  const totalContainers = containers.length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Container Management</h1>
          <p className="text-muted-foreground">
            {runningContainers} of {totalContainers} containers running
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Pull Image
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Container
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search containers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Monitor className="w-4 h-4 mr-2" />
          Docker Stats
        </Button>
      </div>

      {/* Containers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContainers.map((container) => (
          <Card key={container.id} className="shadow-card bg-gradient-surface hover:shadow-widget transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium text-foreground">
                    {container.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{container.image}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(container.status)}
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(container.status)}
                  >
                    {container.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Resource Usage */}
              {container.status === 'running' && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>{container.cpuUsage.toFixed(1)}%</span>
                    </div>
                    <Progress value={container.cpuUsage} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>{container.memoryUsage}MB / {container.memoryLimit}MB</span>
                    </div>
                    <Progress 
                      value={(container.memoryUsage / container.memoryLimit) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              )}

              {/* Container Info */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-muted-foreground">Created</div>
                  <div className="font-medium">{container.created}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Uptime</div>
                  <div className="font-medium">{container.uptime}</div>
                </div>
              </div>

              {/* Ports */}
              {container.ports.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Ports</div>
                  <div className="flex flex-wrap gap-1">
                    {container.ports.map((port, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {port}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {container.status === "running" ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleContainerAction(container.id, 'pause')}
                    >
                      <Square className="w-3 h-3 mr-1" />
                      Pause
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleContainerAction(container.id, 'restart')}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Restart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleContainerAction(container.id, 'stop')}
                    >
                      <Square className="w-3 h-3" />
                    </Button>
                  </>
                ) : container.status === "paused" ? (
                  <>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleContainerAction(container.id, 'unpause')}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Resume
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleContainerAction(container.id, 'stop')}
                    >
                      <Square className="w-3 h-3" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleContainerAction(container.id, 'start')}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContainers.length === 0 && (
        <div className="text-center py-12">
          <Monitor className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No containers found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Containers;