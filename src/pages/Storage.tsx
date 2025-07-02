import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  HardDrive, 
  Folder, 
  Search, 
  Plus, 
  Trash2, 
  Download,
  Upload,
  Database,
  Archive
} from "lucide-react";

interface StorageDevice {
  name: string;
  mountPoint: string;
  size: number;
  used: number;
  available: number;
  type: 'SSD' | 'HDD' | 'NVMe';
  health: 'Good' | 'Warning' | 'Critical';
}

const Storage = () => {
  const [storageDevices] = useState<StorageDevice[]>([
    {
      name: '/dev/sda1',
      mountPoint: '/',
      size: 500,
      used: 320,
      available: 180,
      type: 'SSD',
      health: 'Good'
    },
    {
      name: '/dev/sdb1', 
      mountPoint: '/home',
      size: 1000,
      used: 450,
      available: 550,
      type: 'HDD',
      health: 'Good'
    },
    {
      name: '/dev/nvme0n1',
      mountPoint: '/var',
      size: 250,
      used: 180,
      available: 70,
      type: 'NVMe',
      health: 'Warning'
    }
  ]);

  const getTotalStorage = () => {
    return storageDevices.reduce((total, device) => total + device.size, 0);
  };

  const getTotalUsed = () => {
    return storageDevices.reduce((total, device) => total + device.used, 0);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 70) return "text-success";
    if (percentage < 90) return "text-warning";
    return "text-destructive";
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Good": return "text-success";
      case "Warning": return "text-warning";
      case "Critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "SSD": return "💾";
      case "HDD": return "🗂️";
      case "NVMe": return "⚡";
      default: return "💽";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Storage Management</h1>
        <p className="text-muted-foreground">
          {getTotalUsed()}GB used of {getTotalStorage()}GB total
        </p>
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <HardDrive className="h-4 w-4 text-storage" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{getTotalStorage()}GB</div>
            <p className="text-xs text-muted-foreground">3 drives connected</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used Space</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{getTotalUsed()}GB</div>
            <p className="text-xs text-muted-foreground">
              {((getTotalUsed() / getTotalStorage()) * 100).toFixed(1)}% utilized
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {getTotalStorage() - getTotalUsed()}GB
            </div>
            <p className="text-xs text-success">Space remaining</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Status</CardTitle>
            <Archive className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Good</div>
            <p className="text-xs text-muted-foreground">All drives healthy</p>
          </CardContent>
        </Card>
      </div>

      {/* Storage Devices */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Storage Devices</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Mount Drive
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {storageDevices.map((device, index) => {
            const usagePercentage = (device.used / device.size) * 100;
            
            return (
              <Card key={index} className="shadow-card bg-gradient-surface">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeIcon(device.type)}</span>
                      <div>
                        <CardTitle className="text-base">{device.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{device.mountPoint}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${getHealthColor(device.health)}`}>
                      {device.health}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Storage Usage</span>
                      <span className={getUsageColor(usagePercentage)}>
                        {usagePercentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={usagePercentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{device.used}GB used</span>
                      <span>{device.available}GB free</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground">Total Size</div>
                      <div className="font-medium">{device.size}GB</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Type</div>
                      <div className="font-medium">{device.type}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Folder className="w-3 h-3 mr-1" />
                      Browse
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* File System Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader>
            <CardTitle>Recent File Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Created', file: '/var/log/nginx/access.log', time: '2 minutes ago', icon: Plus },
                { action: 'Modified', file: '/etc/nginx/nginx.conf', time: '5 minutes ago', icon: Download },
                { action: 'Deleted', file: '/tmp/temp_backup.tar.gz', time: '10 minutes ago', icon: Trash2 },
                { action: 'Uploaded', file: '/home/user/documents/report.pdf', time: '15 minutes ago', icon: Upload },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <activity.icon className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-muted-foreground font-mono">{activity.file}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader>
            <CardTitle>Disk I/O Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Read Speed</span>
                  <span>125 MB/s</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Write Speed</span>
                  <span>98 MB/s</span>
                </div>
                <Progress value={49} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                <div>
                  <div className="text-muted-foreground">Total Reads</div>
                  <div className="font-medium">2.4 TB</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total Writes</div>
                  <div className="font-medium">1.8 TB</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Storage;