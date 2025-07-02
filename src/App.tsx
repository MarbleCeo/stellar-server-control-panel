import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ServerSidebar } from "@/components/dashboard/ServerSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import Index from "./pages/Index";
import SystemMonitor from "./pages/SystemMonitor";
import Services from "./pages/Services";
import Containers from "./pages/Containers";
import Storage from "./pages/Storage";
import Network from "./pages/Network";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <ServerSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <DashboardHeader />
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/monitor" element={<SystemMonitor />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/containers" element={<Containers />} />
                  <Route path="/storage" element={<Storage />} />
                  <Route path="/network" element={<Network />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
