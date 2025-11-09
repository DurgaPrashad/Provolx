import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Car, ChevronDown, LayoutDashboard, BarChart3, GitBranch, Layers, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Car },
    { path: "/demo", label: "Demo", icon: Car },
  ];

  const dropdownItems = [
    { path: "/customer-dashboard", label: "Customer", icon: User },
    { path: "/agent-dashboard", label: "Agent", icon: Wrench },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/process-flow", label: "Process", icon: GitBranch },
    { path: "/tech-stack", label: "Tech Stack", icon: Layers }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Provolx</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            {/* More Options Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                More Options
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-1 w-48 glass rounded-lg border border-secondary/20 shadow-lg z-50"
                >
                  {dropdownItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={index} 
                        to={item.path}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className={`flex items-center gap-2 p-2 hover:bg-secondary/10 rounded-lg transition-colors ${isActive(item.path) ? 'bg-secondary/20' : ''}`}>
                          <Icon className="w-4 h-4 text-secondary" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </div>
            
            {/* Login Button */}
            <Link to="/login">
              <Button variant="default" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            {/* Mobile More Options */}
            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-between gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  More Options
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isDropdownOpen && (
                <div className="pl-4 pt-2 space-y-1">
                  {dropdownItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={index} 
                        to={item.path}
                        onClick={() => {
                          setIsOpen(false);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className={`flex items-center gap-2 p-2 hover:bg-secondary/10 rounded-lg transition-colors ${isActive(item.path) ? 'bg-secondary/20' : ''}`}>
                          <Icon className="w-4 h-4 text-secondary" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Mobile Login */}
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full justify-start gap-2 mt-2">
                <User className="w-4 h-4" />
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;