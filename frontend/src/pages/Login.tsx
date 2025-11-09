import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench } from "lucide-react";

const Login = () => {
  const [userType, setUserType] = useState<"customer" | "provider">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate here
    if (userType === "customer") {
      navigate("/customer-dashboard");
    } else {
      navigate("/agent-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vw-blue to-vw-light-blue p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-2 border-secondary/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <Car className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Provolx Login</CardTitle>
            <CardDescription>
              After-Sales Support with AI Intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <Button
                variant={userType === "customer" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setUserType("customer")}
              >
                <Car className="w-4 h-4 mr-2" />
                Customer
              </Button>
              <Button
                variant={userType === "provider" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setUserType("provider")}
              >
                <Wrench className="w-4 h-4 mr-2" />
                Service Provider
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/demo" className="text-primary hover:underline">
                  Request a demo
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;