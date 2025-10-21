import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ChatWidget from "./components/ChatWidget";
import LoadingScreen from "./components/LoadingScreen";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import Index from "./pages/Index";
import CustomerDashboard from "./pages/CustomerDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import ProcessFlow from "./pages/ProcessFlow";
import TechStack from "./pages/TechStack";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence>
          {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
        </AnimatePresence>
        {!isLoading && (
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
              <Route path="/agent-dashboard" element={<AgentDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/process-flow" element={<ProcessFlow />} />
              <Route path="/tech-stack" element={<TechStack />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatWidget />
            <KeyboardShortcuts />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
