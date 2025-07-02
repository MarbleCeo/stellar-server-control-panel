import { useState, useEffect } from 'react';

export interface SystemStats {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  temperature: number;
  uptime: number;
}

export interface NetworkInterface {
  name: string;
  ip: string;
  status: 'connected' | 'disconnected';
  speed: string;
  bytesReceived: number;
  bytesSent: number;
}

export interface Process {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: 'running' | 'sleeping' | 'stopped';
}

// Simulate real-time system data
export function useSystemStats() {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0,
    temperature: 0,
    uptime: 0
  });

  useEffect(() => {
    const updateStats = () => {
      // Simulate realistic fluctuating data
      setStats({
        cpu: Math.max(0, Math.min(100, stats.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(90, stats.memory + (Math.random() - 0.5) * 5)),
        storage: Math.max(10, Math.min(95, stats.storage + (Math.random() - 0.5) * 2)),
        network: Math.max(0, Math.min(100, Math.random() * 100)),
        temperature: Math.max(30, Math.min(80, 45 + Math.random() * 20)),
        uptime: Date.now() - (15 * 24 * 60 * 60 * 1000) + Math.random() * 1000
      });
    };

    // Initial values
    updateStats();
    
    // Update every 2 seconds for real-time feel
    const interval = setInterval(updateStats, 2000);
    
    return () => clearInterval(interval);
  }, [stats.cpu, stats.memory, stats.storage]);

  return stats;
}

export function useNetworkInterfaces() {
  const [interfaces, setInterfaces] = useState<NetworkInterface[]>([
    {
      name: 'eth0',
      ip: '192.168.1.100',
      status: 'connected',
      speed: '1000 Mbps',
      bytesReceived: 0,
      bytesSent: 0
    },
    {
      name: 'wlan0', 
      ip: '192.168.1.101',
      status: 'connected',
      speed: '300 Mbps',
      bytesReceived: 0,
      bytesSent: 0
    }
  ]);

  useEffect(() => {
    const updateNetwork = () => {
      setInterfaces(prev => prev.map(iface => ({
        ...iface,
        bytesReceived: iface.bytesReceived + Math.random() * 1000000,
        bytesSent: iface.bytesSent + Math.random() * 500000
      })));
    };

    const interval = setInterval(updateNetwork, 3000);
    return () => clearInterval(interval);
  }, []);

  return interfaces;
}

export function useProcessList() {
  const [processes, setProcesses] = useState<Process[]>([
    { pid: 1, name: 'systemd', cpu: 0.1, memory: 2.3, status: 'running' },
    { pid: 1234, name: 'nginx', cpu: 1.2, memory: 5.6, status: 'running' },
    { pid: 1235, name: 'postgres', cpu: 2.1, memory: 15.4, status: 'running' },
    { pid: 1236, name: 'redis-server', cpu: 0.8, memory: 3.2, status: 'running' },
    { pid: 1237, name: 'node', cpu: 5.4, memory: 12.8, status: 'running' },
  ]);

  useEffect(() => {
    const updateProcesses = () => {
      setProcesses(prev => prev.map(proc => ({
        ...proc,
        cpu: Math.max(0, proc.cpu + (Math.random() - 0.5) * 2),
        memory: Math.max(0, proc.memory + (Math.random() - 0.5) * 1)
      })));
    };

    const interval = setInterval(updateProcesses, 5000);
    return () => clearInterval(interval);
  }, []);

  return processes;
}