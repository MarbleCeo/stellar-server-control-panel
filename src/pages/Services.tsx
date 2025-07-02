import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Square, RotateCcw, Search, Plus, Package, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  status: "running" | "stopped" | "error" | "starting" | "stopping";
  description: string;
  port?: number;
  memoryUsage: string;
  cpuUsage: number;
  autoStart: boolean;
  lastRestart: string;
}

const Services = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([
    {
      id: "nginx",
      name: "Nginx Web Server",
      status: "running",
      description: "High-performance web server and reverse proxy",
      port: 80,
      memoryUsage: "45.2 MB",
      cpuUsage: 1.2,
      autoStart: true,
      lastRestart: "2024-01-15 10:30:45"
    },
    {
      id: "postgres",
      name: "PostgreSQL Database",
      status: "running", 
      description: "Advanced open source relational database",
      port: 5432,
      memoryUsage: "128.5 MB",
      cpuUsage: 2.1,
      autoStart: true,
      lastRestart: "2024-01-15 10:30:42"
    },
    {
      id: "redis",
      name: "Redis Cache",
      status: "running",
      description: "In-memory data structure store",
      port: 6379,
      memoryUsage: "32.1 MB", 
      cpuUsage: 0.8,
      autoStart: true,
      lastRestart: "2024-01-15 10:30:48"
    },
    {
      id: "nodejs",
      name: "Node.js Application",
      status: "stopped",
      description: "JavaScript runtime for server-side applications",
      port: 3000,
      memoryUsage: "0 MB",
      cpuUsage: 0,
      autoStart: false,
      lastRestart: "2024-01-14 15:22:10"
    },
    {
      id: "docker",
      name: "Docker Engine", 
      status: "running",
      description: "Container runtime and orchestration",
      memoryUsage: "256.7 MB",
      cpuUsage: 3.4,
      autoStart: true,
      lastRestart: "2024-01-15 10:30:35"
    },
    {
      id: "filebrowser",
      name: "File Browser",
      status: "error",
      description: "Web-based file management interface",
      port: 8080,
      memoryUsage: "0 MB",
      cpuUsage: 0,
      autoStart: false,
      lastRestart: "2024-01-14 12:45:33"
    }
  ]);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-success text-success-foreground";
      case "stopped": return "bg-secondary text-secondary-foreground";
      case "error": return "bg-destructive text-destructive-foreground";
      case "starting": return "bg-warning text-warning-foreground";
      case "stopping": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow" />;
      case "stopped": return <Square className="w-3 h-3 text-muted-foreground" />;
      case "error": return <div className="w-2 h-2 bg-destructive rounded-full" />;
      case "starting": return <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />;
      case "stopping": return <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />;
      default: return null;
    }
  };

  const handleServiceAction = async (serviceId: string, action: 'start' | 'stop' | 'restart') => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    // Show loading state
    const loadingStatus = action === 'start' ? 'starting' : action === 'stop' ? 'stopping' : 'starting';
    setServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, status: loadingStatus as any } : s
    ));

    // Simulate API call
    setTimeout(() => {
      const newStatus = action === 'start' ? 'running' : action === 'stop' ? 'stopped' : 'running';
      setServices(prev => prev.map(s => 
        s.id === serviceId ? { 
          ...s, 
          status: newStatus as any,
          lastRestart: new Date().toISOString().replace('T', ' ').substring(0, 19),
          memoryUsage: newStatus === 'running' ? (Math.random() * 100 + 20).toFixed(1) + ' MB' : '0 MB',
          cpuUsage: newStatus === 'running' ? Math.random() * 5 : 0
        } : s
      ));

      toast({
        title: `Service ${action}ed`,
        description: `${service.name} has been ${action}ed successfully.`,
      });
    }, 2000);
  };

  const runningServices = services.filter(s => s.status === 'running').length;
  const totalServices = services.length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Services Management</h1>
          <p className="text-muted-foreground">
            {runningServices} of {totalServices} services running
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Manage All
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="shadow-card bg-gradient-surface hover:shadow-widget transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-foreground">
                  {service.name}
                </CardTitle>
                {getStatusIcon(service.status)}
              </div>
              <Badge 
                variant="secondary" 
                className={getStatusColor(service.status)}
              >
                {service.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              
              {/* Service Stats */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-muted-foreground">Memory</div>
                  <div className="font-medium">{service.memoryUsage}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">CPU</div>
                  <div className="font-medium">{service.cpuUsage.toFixed(1)}%</div>
                </div>
                {service.port && (
                  <div>
                    <div className="text-muted-foreground">Port</div>
                    <div className="font-medium">{service.port}</div>
                  </div>
                )}
                <div>
                  <div className="text-muted-foreground">Auto Start</div>
                  <div className="font-medium">{service.autoStart ? 'Yes' : 'No'}</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Last restart: {service.lastRestart}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {service.status === "running" ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleServiceAction(service.id, 'stop')}
                    >
                      <Square className="w-3 h-3 mr-1" />
                      Stop
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleServiceAction(service.id, 'restart')}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Restart
                    </Button>
                  </>
                ) : service.status === "starting" || service.status === "stopping" ? (
                  <Button variant="outline" size="sm" className="flex-1" disabled>
                    <Package className="w-3 h-3 mr-1 animate-spin" />
                    {service.status}...
                  </Button>
                ) : (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleServiceAction(service.id, 'start')}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No services found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Services;