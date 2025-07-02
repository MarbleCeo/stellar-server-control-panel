import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNetworkInterfaces } from "@/hooks/useSystemData";
import { Wifi, Activity, Globe, Router } from "lucide-react";

const Network = () => {
  const interfaces = useNetworkInterfaces();

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Network Monitor</h1>
        <p className="text-muted-foreground">Network interfaces and traffic monitoring</p>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Interfaces</CardTitle>
            <Wifi className="h-4 w-4 text-network" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {interfaces.filter(i => i.status === 'connected').length}
            </div>
            <p className="text-xs text-success">All online</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2.4 GB</div>
            <p className="text-xs text-muted-foreground">This session</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Connections</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">247</div>
            <p className="text-xs text-success">Stable</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latency</CardTitle>
            <Router className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12ms</div>
            <p className="text-xs text-success">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Network Interfaces */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {interfaces.map((iface) => (
          <Card key={iface.name} className="shadow-card bg-gradient-surface">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{iface.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    iface.status === 'connected' ? 'bg-success animate-pulse-slow' : 'bg-destructive'
                  }`} />
                  <span className="text-sm text-muted-foreground">{iface.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">IP Address</div>
                  <div className="font-medium">{iface.ip}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Speed</div>
                  <div className="font-medium">{iface.speed}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bytes Received</span>
                    <span>{formatBytes(iface.bytesReceived)}</span>
                  </div>
                  <Progress value={Math.min((iface.bytesReceived / 10000000) * 100, 100)} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bytes Sent</span>
                    <span>{formatBytes(iface.bytesSent)}</span>
                  </div>
                  <Progress value={Math.min((iface.bytesSent / 5000000) * 100, 100)} className="h-2" />
                </div>
              </div>

              <div className="pt-2 border-t text-xs text-muted-foreground">
                <div>↓ Download Rate: {(Math.random() * 50 + 10).toFixed(1)} MB/s</div>
                <div>↑ Upload Rate: {(Math.random() * 20 + 5).toFixed(1)} MB/s</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Connections */}
      <Card className="shadow-card bg-gradient-surface">
        <CardHeader>
          <CardTitle>Active Network Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { protocol: 'TCP', local: '192.168.1.100:80', remote: '203.0.113.1:45632', state: 'ESTABLISHED' },
              { protocol: 'TCP', local: '192.168.1.100:443', remote: '198.51.100.2:54321', state: 'ESTABLISHED' },
              { protocol: 'UDP', local: '192.168.1.100:53', remote: '8.8.8.8:53', state: 'ACTIVE' },
              { protocol: 'TCP', local: '192.168.1.100:5432', remote: '192.168.1.50:12345', state: 'ESTABLISHED' },
              { protocol: 'TCP', local: '192.168.1.100:22', remote: '192.168.1.25:56789', state: 'ESTABLISHED' },
            ].map((conn, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-mono font-medium">{conn.protocol}</span>
                  <span className="text-muted-foreground">{conn.local}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-muted-foreground">{conn.remote}</span>
                </div>
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">
                  {conn.state}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Network;