import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Play, Square, RotateCcw } from "lucide-react";

interface Service {
  id: string;
  name: string;
  status: "running" | "stopped" | "error";
  description: string;
  port?: number;
  memoryUsage?: string;
}

interface ServicesGridProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: "1",
    name: "Nginx",
    status: "running",
    description: "Web server and reverse proxy",
    port: 80,
    memoryUsage: "45MB"
  },
  {
    id: "2", 
    name: "PostgreSQL",
    status: "running",
    description: "Database server",
    port: 5432,
    memoryUsage: "128MB"
  },
  {
    id: "3",
    name: "Redis",
    status: "running", 
    description: "In-memory data store",
    port: 6379,
    memoryUsage: "32MB"
  },
  {
    id: "4",
    name: "Node.js App",
    status: "stopped",
    description: "Web application server",
    port: 3000,
    memoryUsage: "0MB"
  },
  {
    id: "5",
    name: "Docker",
    status: "running",
    description: "Container runtime",
    memoryUsage: "256MB"
  },
  {
    id: "6",
    name: "File Browser",
    status: "error",
    description: "Web-based file manager",
    port: 8080,
    memoryUsage: "0MB"
  }
];

export function ServicesGrid({ services = defaultServices }: ServicesGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-success text-success-foreground";
      case "stopped": return "bg-secondary text-secondary-foreground";
      case "error": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow" />;
      case "stopped": return <Square className="w-3 h-3 text-muted-foreground" />;
      case "error": return <div className="w-2 h-2 bg-destructive rounded-full" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Services</h2>
        <Button variant="outline" size="sm">
          <Package className="w-4 h-4 mr-2" />
          Manage All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
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
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                {service.port && <span>Port: {service.port}</span>}
                {service.memoryUsage && <span>RAM: {service.memoryUsage}</span>}
              </div>

              <div className="flex gap-2">
                {service.status === "running" ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Square className="w-3 h-3 mr-1" />
                      Stop
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Restart
                    </Button>
                  </>
                ) : (
                  <Button variant="default" size="sm" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}